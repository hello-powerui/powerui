'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Palette, Layers, Share2, Sparkles } from 'lucide-react';

interface WelcomeModalProps {
  isNewUser?: boolean;
}

export function WelcomeModal({ isNewUser = false }: WelcomeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Check if user has seen the welcome modal before
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome && isNewUser) {
      setIsOpen(true);
    }
  }, [isNewUser]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  const handleGetStarted = () => {
    handleClose();
    router.push('/themes/studio');
  };

  const steps = [
    {
      icon: <Sparkles className="w-12 h-12 text-blue-500" />,
      title: "Welcome to PowerUI!",
      description: "Create beautiful, consistent Power BI themes in minutes. Let's show you around.",
    },
    {
      icon: <Palette className="w-12 h-12 text-purple-500" />,
      title: "Design with Palettes",
      description: "Start with pre-built color palettes or create your own. Your colors automatically adapt to create harmonious themes.",
    },
    {
      icon: <Layers className="w-12 h-12 text-green-500" />,
      title: "Customize Every Detail",
      description: "Fine-tune visual styles, typography, and structural elements. See changes instantly in the live preview.",
    },
    {
      icon: <Share2 className="w-12 h-12 text-orange-500" />,
      title: "Share with Your Team",
      description: "Collaborate with your team by sharing themes. Export to Power BI with one click.",
    },
  ];

  const currentStepData = steps[currentStep];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            {currentStepData.icon}
          </div>
          <DialogTitle className="text-center text-xl">
            {currentStepData.title}
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            {currentStepData.description}
          </DialogDescription>
        </DialogHeader>
        
        {/* Step indicators */}
        <div className="flex justify-center gap-2 py-4">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === currentStep ? 'bg-gray-900' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        <DialogFooter className="sm:justify-between">
          {currentStep > 0 && (
            <Button
              variant="ghost"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Back
            </Button>
          )}
          
          <div className={`flex gap-2 ${currentStep === 0 ? 'ml-auto' : ''}`}>
            <Button
              variant="outline"
              onClick={handleClose}
            >
              Skip Tour
            </Button>
            
            {currentStep < steps.length - 1 ? (
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleGetStarted}
                className="bg-gray-900 hover:bg-gray-800"
              >
                Get Started
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}