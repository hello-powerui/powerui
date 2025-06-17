"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Share2, Lock, Users, Globe, Loader2 } from "lucide-react";

interface Organization {
  id: string;
  name: string;
}

interface ThemeSharingControlsProps {
  themeId: string;
  currentVisibility?: "PRIVATE" | "ORGANIZATION" | "PUBLIC";
  currentOrganizationId?: string | null;
  onUpdate?: () => void;
}

export function ThemeSharingControls({
  themeId,
  currentVisibility = "PRIVATE",
  currentOrganizationId,
  onUpdate,
}: ThemeSharingControlsProps) {
  const { userId } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [visibility, setVisibility] = useState(currentVisibility);
  const [selectedOrgId, setSelectedOrgId] = useState(currentOrganizationId || "");
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchOrganizations();
    }
  }, [isOpen]);

  const fetchOrganizations = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/organizations");
      if (response.ok) {
        const data = await response.json();
        setOrganizations(data);
        // Set first org as default if user has organizations
        if (data.length > 0 && !selectedOrgId) {
          setSelectedOrgId(data[0].id);
        }
      }
    } catch (error) {
      // console.error("Error fetching organizations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/themes/${themeId}/share`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visibility,
          organizationId: visibility === "ORGANIZATION" ? selectedOrgId : null,
        }),
      });

      if (response.ok) {
        toast.success("Theme sharing settings updated");
        setIsOpen(false);
        onUpdate?.();
      } else {
        toast.error("Failed to update sharing settings");
      }
    } catch (error) {
      // console.error("Error updating sharing:", error);
      toast.error("Failed to update sharing settings");
    } finally {
      setIsSaving(false);
    }
  };

  const getVisibilityIcon = () => {
    switch (currentVisibility) {
      case "ORGANIZATION":
        return <Users className="h-4 w-4" />;
      case "PUBLIC":
        return <Globe className="h-4 w-4" />;
      default:
        return <Lock className="h-4 w-4" />;
    }
  };

  const getVisibilityLabel = () => {
    switch (currentVisibility) {
      case "ORGANIZATION":
        return "Team";
      case "PUBLIC":
        return "Public";
      default:
        return "Private";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          {getVisibilityIcon()}
          <span className="ml-2">{getVisibilityLabel()}</span>
          <Share2 className="ml-2 h-3 w-3" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Theme</DialogTitle>
          <DialogDescription>
            Choose who can access and use this theme
          </DialogDescription>
        </DialogHeader>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-6">
            <RadioGroup value={visibility} onValueChange={(v) => setVisibility(v as any)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="PRIVATE" id="private" />
                <Label htmlFor="private" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    <span className="font-medium">Private</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Only you can access this theme
                  </p>
                </Label>
              </div>
              
              {organizations.length > 0 && (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ORGANIZATION" id="organization" />
                  <Label htmlFor="organization" className="flex-1 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span className="font-medium">Share with Team</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      All team members can access this theme
                    </p>
                  </Label>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="PUBLIC" id="public" />
                <Label htmlFor="public" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span className="font-medium">Public</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Anyone with PowerUI can access this theme
                  </p>
                </Label>
              </div>
            </RadioGroup>

            {visibility === "ORGANIZATION" && organizations.length > 0 && (
              <div className="space-y-2">
                <Label>Select Organization</Label>
                <Select value={selectedOrgId} onValueChange={setSelectedOrgId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an organization" />
                  </SelectTrigger>
                  <SelectContent>
                    {organizations.map((org) => (
                      <SelectItem key={org.id} value={org.id}>
                        {org.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}