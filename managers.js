// Constants
const API_URL = "https://power-ui-test-53e235d2888e.herokuapp.com/";

console.log('PowerUI Managers v1.0.15 loaded');

// test: https://power-ui-test-53e235d2888e.herokuapp.com/
// Prod https://power-ui-88fa0fe861ac.herokuapp.com/

// Remove duplicate global helper functions and keep only ColorUtils
window.ColorUtils = {
    isValidHexColor(color) {
        const cleanColor = color.trim().replace(/\s/g, '');
        const hexValue = cleanColor.startsWith('#') ? cleanColor : '#' + cleanColor;
        return /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(hexValue);
    },

    rgbToHex(rgb) {
        const rgbValues = rgb.match(/\d+/g).map(Number);
        return `#${((1 << 24) + (rgbValues[0] << 16) + (rgbValues[1] << 8) + rgbValues[2]).toString(16).slice(1)}`;
    }
};

// DOM Utilities
window.DOMUtils = {
    // Radio button management
    setRadioChecked(name, value, shouldTriggerChange = false) {
        // First clear all radios in the group to ensure no duplicate selections
        this.clearRadioGroup(name);
        
        const radio = document.querySelector(`input[name="${name}"][value="${value}"]`);
        if (radio) {
            radio.checked = true;
            const customRadio = radio.previousElementSibling;
            if (customRadio?.classList.contains('w-radio-input')) {
                customRadio.classList.add('w--redirected-checked');
            }
            if (shouldTriggerChange) {
                radio.dispatchEvent(new Event('change'));
            }
        }
        return radio;
    },

    clearRadioGroup(name) {
        document.querySelectorAll(`input[name="${name}"]`).forEach(radio => {
            radio.checked = false;
            const customRadio = radio.previousElementSibling;
            if (customRadio?.classList.contains('w-radio-input')) {
                customRadio.classList.remove('w--redirected-checked');
            }
        });
    },

    // Checkbox management
    setCheckboxState(checkbox, checked) {
        if (!checkbox) return;
        checkbox.checked = checked;
        const customCheckbox = checkbox.previousElementSibling;
        if (customCheckbox) {
            customCheckbox.className = 'w-checkbox-input w-checkbox-input--inputType-custom checkbox';
            if (checked) {
                customCheckbox.classList.add('w--redirected-checked');
            }
        }
    },

    // Element creation and management
    createElement(tag, className, attributes = {}) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
        return element;
    },

    // Theme element creation helper
    createThemeElement(template, theme) {
        const element = template.cloneNode(true);
        element.id = '';
        element.style.display = 'flex';
        element.classList.add('radio-button-card', 'custom');

        // Configure radio button
        const radio = element.querySelector('.radio-button');
        if (radio) {
            radio.id = theme.id;
            radio.value = theme.id;
            radio.name = 'themes';
            radio.setAttribute('data-name', 'themes');
        }
        
        // Configure title
        const title = element.querySelector('.theme-title');
        if (title) {
            title.setAttribute('for', theme.id);
            title.textContent = theme.name;
        }

        // Configure description if exists
        const description = element.querySelector('.theme-description');
        if (description) {
            description.textContent = theme.description || '';
        }

        return element;
    },

    // Save animation
    showSaveAnimation(button) {
        return new Promise(resolve => {
            // Start rotating refresh icon
            const refreshIcon = button.querySelector('img');
            if (refreshIcon) {
                refreshIcon.style.transition = 'transform 0.6s linear';
                refreshIcon.style.transform = 'rotate(360deg)';
            }

            // Ensure checkmark exists
            let checkmark = button.querySelector('.save-checkmark');
            if (!checkmark) {
                checkmark = document.createElement('div');
                checkmark.className = 'save-checkmark';
                checkmark.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                        <path d="M20 6L9 17L4 12" class="checkmark-path"/>
                    </svg>
                `;
                button.appendChild(checkmark);
            }

            button.classList.add('saving');
            
            setTimeout(() => {
                if (refreshIcon) {
                    refreshIcon.style.transition = 'none';
                    refreshIcon.style.transform = 'none';
                }
                button.classList.remove('saving');
                button.classList.add('saved');
                
                setTimeout(() => {
                    button.classList.remove('saved');
                    resolve();
                }, 1500);
            }, 600);
        });
    },

    // Notification system
    showNotification(message, type = 'success') {
        // Find the Webflow notification template
        let notification = document.querySelector('.notification-toast');
        if (!notification) {
            return;
        }

        // Find the message element
        const messageElement = notification.querySelector('.notification-message');
        if (messageElement) {
            messageElement.textContent = message;
        }

        // Handle the icon visibility based on type
        const iconElement = notification.querySelector('.notification-icon');
        if (iconElement) {
            iconElement.style.display = type === 'success' ? '' : 'none';
        }

        // Show the notification
        notification.style.display = 'flex';
        notification.classList.remove('hide');
        
        // Hide after delay
        setTimeout(() => {
            notification.classList.add('hide');
        }, 2000);
    }
};

// State Manager
window.StateManager = {
    initialized: false,
    memberData: null,

    async initialize() {
        if (this.initialized) return;

        // Wait for MemberStack
        if (!window.$memberstackDom) {
            await new Promise(resolve => {
                const check = setInterval(() => {
                    if (window.$memberstackDom) {
                        clearInterval(check);
                        resolve();
                    }
                }, 100);
            });
        }

        this.memberData = await this.getMemberData();
        this.initialized = true;
        return this.memberData;
    },

    async getMemberData() {
        if (this.memberData) return this.memberData;

        try {
            const { data } = await window.$memberstackDom.getMemberJSON();
            this.memberData = {
                themes: data?.themes || [],
                customPalettes: data?.customPalettes || [],
                neutralPalettes: data?.neutralPalettes || []
            };
            return this.memberData;
        } catch (error) {
            console.error('StateManager: Error getting member data:', error);
            return { themes: [], customPalettes: [], neutralPalettes: [] };
        }
    },

    saveTimeout: null,
    async saveData(themes, customPalettes, neutralPalettes) {
        clearTimeout(this.saveTimeout);
        return new Promise((resolve, reject) => {
            this.saveTimeout = setTimeout(async () => {
                try {
                    await window.$memberstackDom.updateMemberJSON({
                        json: { themes, customPalettes, neutralPalettes }
                    });
                    resolve();
                } catch (error) {
                    console.error('StateManager: Error saving data:', error);
                    reject(error);
                }
            }, 500);
        });
    },

    async saveThemes(themes) {
        const { customPalettes, neutralPalettes } = await this.getMemberData();
        await this.saveData(themes, customPalettes, neutralPalettes);
    },

    async savePalettes(palettes) {
        const { themes, neutralPalettes } = await this.getMemberData();
        await this.saveData(themes, palettes, neutralPalettes);
    },

    async saveNeutralPalettes(neutralPalettes) {
        const { themes, customPalettes } = await this.getMemberData();
        await this.saveData(themes, customPalettes, neutralPalettes);
    }
};

// Style Manager
window.StyleManager = {
    FONT_CLASSES: ['segoe-ui', 'arial', 'calibri', 'candara', 'corbel', 'tahoma', 'trebuchet', 'public-sans', 'space-grotesk', 'inter'],
    NEUTRAL_PALETTES: ['cool', 'ice', 'neutral', 'stone', 'warm', 'eclipse', 'jungle', 'lava'],
    RADIUS_CLASSES: ['radius-none', 'radius-sm', 'radius-md', 'radius-lg'],
    CONTRAST_CLASSES: ['subtle-contrast', 'inversed-contrast'],

    updateFontFamily(fontFamily) {
        this.FONT_CLASSES.forEach(c => document.documentElement.classList.remove(c));
        if (fontFamily !== 'default') document.documentElement.classList.add(fontFamily);
    },

    updateNeutralPalette(palette) {
        const root = document.documentElement;
        
        // First remove all neutral palette classes
        this.NEUTRAL_PALETTES.forEach(p => root.classList.remove(p));
        
        // Clean up any custom neutral palette CSS variables
        const shades = ['25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
        shades.forEach(shade => {
            root.style.removeProperty(`--neutral-${shade}`);
        });
        
        // If it's a built-in palette, just add the class
        if (this.NEUTRAL_PALETTES.includes(palette)) {
            root.classList.add(palette);
            return;
        }
        
        // If it's a custom neutral palette (starts with 'neutral-')
        if (palette.startsWith('neutral-')) {
            // Find the palette in CustomPalettesManager
            const customPalette = window.CustomPalettesManager.neutralPalettes.find(p => p.id === palette);
            if (customPalette) {
                // Apply each shade as a CSS variable
                shades.forEach(shade => {
                    const color = customPalette.palette[shade];
                    if (color) {
                        root.style.setProperty(`--neutral-${shade}`, color);
                    }
                });
            }
        }
    },

    updateBorderRadius(radius) {
        this.RADIUS_CLASSES.forEach(c => document.documentElement.classList.remove(c));
        const radiusMap = { '0': 'radius-none', '4': 'radius-sm', '8': 'radius-md', '12': 'radius-lg' };
        document.documentElement.classList.add(radiusMap[radius]);
    },

    updateBackgroundStyle(style) {
        this.CONTRAST_CLASSES.forEach(c => document.documentElement.classList.remove(c));
        if (style !== 'default') document.documentElement.classList.add(style);
    },

    updateColorMode(mode) {
        document.documentElement.classList.toggle('dark', mode === 'dark');
    },

    updateBorderVisibility(show) {
        document.documentElement.classList.toggle('borders-hidden', !show);
    },

    updateDataColors(palette) {
        const root = document.documentElement;
        
        // Clear existing colors
        for (let i = 1; i <= 8; i++) {
            root.style.removeProperty(`--theme-color${i}`);
        }
        
        root.className = root.className.replace(/\btheme-\S+/g, '');
        
        if (typeof palette === 'string') {
            root.classList.add(`theme-${palette}`);
        } else {
            palette?.colors.forEach((color, i) => {
                root.style.setProperty(`--theme-color${i + 1}`, color || 'none');
            });
        }
    }
};

// Custom Palettes Manager
window.CustomPalettesManager = {
    customPalettes: [],
    neutralPalettes: [],  // Add storage for neutral palettes
    MIN_COLORS: 3,
    MAX_COLORS: 10,
    DEFAULT_COLORS: ['#2568E8', '#8338EC', '#FF006E', '#F95608', '#FFBE0C', '#2ACF56', '#3498DB', '#A66999'],
    currentEditingPaletteId: null,
    lastGeneratedPalette: null,

    // Shared utility functions for both create and edit operations
    getModalElements(modalType) {
        const isEdit = modalType === 'edit';
        return {
            modalId: isEdit ? 'edit-palette-lightbox-modal' : 'create-palette-lightbox-modal',
            hexInputId: isEdit ? 'edit-palette-hex-input' : 'palette-hex-input',
            nameInputId: isEdit ? 'Edit-Palette-name' : 'Palette-name',
            descInputId: isEdit ? 'Edit-Palette-description' : 'Palette-description',
            increaseButtonId: isEdit ? 'edit-increase-shades-btn' : 'increase-shades-btn',
            decreaseButtonId: isEdit ? 'edit-decrease-shades-btn' : 'decrease-shades-btn'
        };
    },

    updateShadeButtons(lightboxModal, shadeCount, modalType) {
        const { increaseButtonId, decreaseButtonId } = this.getModalElements(modalType);
        lightboxModal.querySelector(`#${increaseButtonId}`).classList.toggle('disabled', shadeCount >= this.MAX_COLORS);
        lightboxModal.querySelector(`#${decreaseButtonId}`).classList.toggle('disabled', shadeCount <= this.MIN_COLORS);
    },

    async initialize() {
        await this.loadSavedPalettes();
        await this.loadSavedNeutralPalettes();
        this.initializeNeutralPalettesContainer();
        await this.renderSavedNeutralPalettes();
    },

    initializeNeutralPalettesContainer() {
        // Find all existing neutral palette radio buttons
        const neutralPalettes = document.querySelectorAll('label.radio-button-card[for^="neutral-"], label.radio-button-card[for="azure"], label.radio-button-card[for="ice"], label.radio-button-card[for="neutral"], label.radio-button-card[for="stone"], label.radio-button-card[for="warm"], label.radio-button-card[for="eclipse"], label.radio-button-card[for="jungle"], label.radio-button-card[for="lava"]');
        
        if (neutralPalettes.length > 0) {
            // Create container if it doesn't exist
            let container = document.querySelector('.neutral-palettes-container');
            if (!container) {
                container = document.createElement('div');
                container.className = 'neutral-palettes-container';
                // Insert after the first neutral palette's parent
                neutralPalettes[0].parentElement.insertBefore(container, neutralPalettes[0]);
            }
            
            // Move all neutral palettes into the container
            neutralPalettes.forEach(palette => {
                container.appendChild(palette);
            });
        }
    },

    async loadSavedPalettes() {
        const { customPalettes } = await window.StateManager.getMemberData();
        this.customPalettes = customPalettes;
        await this.renderSavedPalettes();
    },

    async loadSavedNeutralPalettes() {
        const { neutralPalettes } = await window.StateManager.getMemberData();
        this.neutralPalettes = neutralPalettes || [];
    },

    renderSavedPalettes() {
        const container = document.getElementById('custom-palettes-container');
        const template = document.getElementById('palette-template');
        if (!container || !template) return;

        container.querySelectorAll('.radio-button-card.custom:not(#palette-template)').forEach(el => el.remove());
        this.customPalettes.forEach(palette => {
            container.appendChild(this.createPaletteElement(template, palette));
        });
    },

    createPaletteElement(template, palette) {
        const element = template.cloneNode(true);
        element.id = '';
        element.style.display = 'flex';

        const radio = element.querySelector('input[type="radio"]');
        radio.id = palette.id;
        radio.value = palette.id;
        radio.name = 'theme-colors';
        radio.setAttribute('data-name', 'theme-colors');

        const label = element.querySelector('.palette-title');
        label.setAttribute('for', palette.id);
        label.textContent = palette.name;

        const paletteContainer = element.querySelector('.palette-container');
        palette.colors.forEach(color => {
            const shade = document.createElement('div');
            shade.classList.add('palette-shade');
            shade.style.backgroundColor = color;
            paletteContainer.appendChild(shade);
        });

        return element;
    },

    initializePaletteModal(modalType, paletteId = null) {
        const elements = this.getModalElements(modalType);
        const lightboxModal = document.getElementById(elements.modalId);
        const paletteContainer = lightboxModal.querySelector('.palette-container.custom');
        const hexInput = lightboxModal.querySelector(`#${elements.hexInputId}`);
        const nameInput = lightboxModal.querySelector(`input#${elements.nameInputId}`);
        const descInput = lightboxModal.querySelector(`input#${elements.descInputId}`);
        
        paletteContainer.innerHTML = '';
        
        let colors = this.DEFAULT_COLORS;
        
        if (modalType === 'edit' && paletteId) {
            this.currentEditingPaletteId = paletteId;
            const palette = this.customPalettes.find(p => p.id === paletteId);
            if (palette) {
                colors = palette.colors;
                nameInput.value = palette.name || '';
                if (descInput) descInput.value = palette.description || '';
            }
        } else {
            nameInput.value = '';
            if (descInput) descInput.value = '';
        }
        
        colors.forEach(color => {
            const shade = document.createElement('div');
            shade.classList.add('palette-shade');
            shade.style.backgroundColor = color;
            paletteContainer.appendChild(shade);
        });
        
        const firstShade = paletteContainer.querySelector('.palette-shade');
        if (firstShade) {
            firstShade.classList.add('selected');
            hexInput.value = colors[0];
            hexInput.focus();
        }

        this.updateShadeButtons(lightboxModal, colors.length, modalType);
    },

    handlePaletteAction(modalType) {
        const elements = this.getModalElements(modalType);
        const lightboxModal = document.getElementById(elements.modalId);
        const nameInput = lightboxModal.querySelector(`input#${elements.nameInputId}`);
        const descInput = lightboxModal.querySelector(`input#${elements.descInputId}`);
        const paletteContainer = lightboxModal.querySelector('.palette-container.custom');
        
        const name = nameInput.value.trim();
        if (!name) {
            alert('Please enter a palette name');
            return;
        }

        const colors = Array.from(paletteContainer?.querySelectorAll('.palette-shade') || [])
            .map(shade => ColorUtils.rgbToHex(shade.style.backgroundColor));
        
        if (colors.length === 0) {
            alert('Please add at least one color');
            return;
        }

        const paletteData = {
            name: name,
            description: descInput?.value.trim() || '',
            colors: colors
        };

        if (modalType === 'edit') {
            const paletteId = this.currentEditingPaletteId;
            if (!paletteId) return;
            this.updatePalette(paletteId, paletteData);
            this.currentEditingPaletteId = null;
        } else {
            const newPalette = {
                id: 'custom-' + Date.now(),
                ...paletteData
            };
            this.customPalettes.push(newPalette);
            this.saveState();
            this.renderSavedPalettes();
        }

        lightboxModal.style.display = 'none';
    },

    handleShadeManagement(action, modalType) {
        const elements = this.getModalElements(modalType);
        const lightboxModal = document.getElementById(elements.modalId);
        const paletteContainer = lightboxModal.querySelector('.palette-container.custom');
        const shades = paletteContainer.querySelectorAll('.palette-shade');
        
        if (action === 'increase' && shades.length < this.MAX_COLORS) {
            const lastShade = shades[shades.length - 1];
            const color = lastShade ? lastShade.style.backgroundColor : '#000000';
            
            const newShade = document.createElement('div');
            newShade.classList.add('palette-shade');
            newShade.style.backgroundColor = color;
            paletteContainer.appendChild(newShade);
        } else if (action === 'decrease' && shades.length > this.MIN_COLORS) {
            shades[shades.length - 1].remove();
        }

        this.updateShadeButtons(lightboxModal, paletteContainer.querySelectorAll('.palette-shade').length, modalType);
    },

    deletePalette(paletteId) {
        const affectedThemes = window.ThemeManager?.themes.filter(t => t.dataPalette === paletteId) || [];
        const palette = this.customPalettes.find(p => p.id === paletteId);
        const lightboxModal = document.getElementById('delete-palette-lightbox-modal');
        const messageElement = lightboxModal.querySelector('.delete-message');
        
        if (messageElement && palette) {
            if (affectedThemes.length > 0) {
                const themeText = affectedThemes.length === 1 ? 'theme' : 'themes';
                messageElement.textContent = `"${palette.name}" is currently used by ${affectedThemes.length} ${themeText}. These ${themeText} will be set to use the default palette if you delete it.`;
            } else {
                messageElement.textContent = `Are you sure you want to delete "${palette.name}"?`;
            }
        }
        
        // Store the palette ID and affected themes for use in the confirmation handler
        lightboxModal.dataset.paletteId = paletteId;
        lightboxModal.dataset.hasAffectedThemes = affectedThemes.length > 0;
        
        // Show the modal
        lightboxModal.style.display = 'flex';
    },

    confirmDeletePalette(paletteId, hasAffectedThemes) {
        const affectedThemes = hasAffectedThemes ? 
            window.ThemeManager.themes.filter(t => t.dataPalette === paletteId) : [];
        
        if (hasAffectedThemes) {
            affectedThemes.forEach(theme => {
                theme.dataPalette = 'power-ui';  // Set to default palette
            });
            
            // Update themes in state
            window.ThemeManager.saveState();
            
            // If any affected theme is currently applied, update the UI
            const currentTheme = document.querySelector('input[name="themes"]:checked');
            if (currentTheme && affectedThemes.some(t => t.id === currentTheme.value)) {
                window.StyleManager.updateDataColors('power-ui');
                
                // Update the theme colors radio selection
                const defaultPaletteRadio = document.querySelector('input[name="theme-colors"][value="power-ui"]');
                if (defaultPaletteRadio) {
                    defaultPaletteRadio.checked = true;
                }
            }
        }
        
        this.customPalettes = this.customPalettes.filter(p => p.id !== paletteId);
        this.saveState();
        return true;
    },

    async saveState() {
        await window.StateManager.savePalettes(this.customPalettes);
    },

    updatePalette(paletteId, updates) {
        const index = this.customPalettes.findIndex(p => p.id === paletteId);
        if (index === -1) return false;
        
        this.customPalettes[index] = { ...this.customPalettes[index], ...updates };
        this.saveState();
        this.renderSavedPalettes();
        return true;
    },

    async generateNeutralPalette(hexColor) {
        try {
            const response = await fetch(`${API_URL}/generate-neutral-palette`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ hexColor: hexColor.replace('#', '') })
            });

            if (!response.ok) {
                throw new Error('Failed to generate palette');
            }

            const data = await response.json();
            this.lastGeneratedPalette = data;
            
            // Show preview in modal
            const modal = document.getElementById('create-neutral-palette-modal');
            const paletteContainer = modal.querySelector('.palette-container');
            if (paletteContainer) {
                paletteContainer.innerHTML = '';
                const shades = ['25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
                shades.forEach(shade => {
                    if (data.palette[shade]) {
                        const shadeElement = document.createElement('div');
                        shadeElement.classList.add('palette-shade');
                        shadeElement.style.backgroundColor = data.palette[shade];
                        paletteContainer.appendChild(shadeElement);
                    }
                });
            }

            return true;
        } catch (error) {
            alert('Failed to generate neutral palette. Please try again.');
            return false;
        }
    },

    handleCoolorsUrl(modalType, url) {
        if (!url) return;
        
        // Extract colors from Coolors URL
        // Format examples:
        // https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51
        // https://coolors.co/palettes/264653-2a9d8f-e9c46a-f4a261-e76f51
        const colors = url.split('/').pop().split('-').map(c => '#' + c);
        
        if (!colors.length || !colors.every(c => ColorUtils.isValidHexColor(c))) {
            alert('Invalid Coolors URL. Please make sure you copy the full URL from Coolors.');
            return;
        }

        // Get modal elements
        const elements = this.getModalElements(modalType);
        const lightboxModal = document.getElementById(elements.modalId);
        const paletteContainer = lightboxModal.querySelector('.palette-container.custom');
        
        // Clear existing shades
        paletteContainer.innerHTML = '';
        
        // Add new shades
        colors.forEach(color => {
            const shade = document.createElement('div');
            shade.classList.add('palette-shade');
            shade.style.backgroundColor = color;
            paletteContainer.appendChild(shade);
        });
        
        // Update shade buttons state
        this.updateShadeButtons(lightboxModal, colors.length, modalType);
        
        // Select the first shade
        const firstShade = paletteContainer.querySelector('.palette-shade');
        if (firstShade) {
            firstShade.classList.add('selected');
            const hexInput = lightboxModal.querySelector(`#${elements.hexInputId}`);
            if (hexInput) {
                hexInput.value = colors[0];
            }
        }
    },

    // Update the save neutral palette handler
    async saveNeutralPalette() {
        const modal = document.getElementById('create-neutral-palette-modal');
        const paletteContainer = modal.querySelector('.palette-container');
        const saveButton = document.getElementById('save-neutral-palette-button');
        
        if (!this.lastGeneratedPalette) {
            alert('Please generate a palette first');
            return;
        }

        const { name, palette } = this.lastGeneratedPalette;
        const paletteId = `neutral-${Date.now()}`;
        
        // Create new neutral palette entry
        const newPalette = {
            id: paletteId,
            name: name,
            palette: palette
        };

        // Add to neutral palettes array
        this.neutralPalettes.push(newPalette);
        
        // Save to MemberStack
        await window.StateManager.saveNeutralPalettes(this.neutralPalettes);
        
        // Render all neutral palettes
        this.renderSavedNeutralPalettes();
        
        // Close modal and reset
        modal.style.display = 'none';
        paletteContainer.innerHTML = '';
        document.getElementById('neutral-palette-hex-input').value = '';
        saveButton.classList.add('disabled');
        saveButton.style.opacity = '0.5';
        saveButton.style.pointerEvents = 'none';
        
        // Clear the stored palette
        this.lastGeneratedPalette = null;
    },

    renderSavedNeutralPalettes() {
        const container = document.querySelector('.neutral-palettes-container');
        const template = document.getElementById('palette-template');
        if (!container || !template) {
            return;
        }

        // Remove any existing custom neutral palettes (those starting with 'neutral-')
        container.querySelectorAll('label.radio-button-card').forEach(label => {
            const input = label.querySelector('input[type="radio"]');
            if (input && input.value.startsWith('neutral-')) {
                label.remove();
            }
        });

        // Render saved neutral palettes
        this.neutralPalettes.forEach(palette => {
            const element = template.cloneNode(true);
            element.id = '';
            element.style.display = 'flex';

            // Configure radio and label
            const radio = element.querySelector('input[type="radio"]');
            radio.id = palette.id;
            radio.value = palette.id;
            radio.name = 'neutral-palettes';
            radio.setAttribute('data-name', 'neutral-palettes');

            const label = element.querySelector('.palette-title');
            label.setAttribute('for', palette.id);
            label.textContent = palette.name;

            // Configure palette container
            const paletteContainer = element.querySelector('.palette-container');
            const addColorWrapper = paletteContainer.querySelector('.add-color-wrapper');
            if (addColorWrapper) addColorWrapper.remove();

            // Add neutral palette shades
            ['25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'].forEach(shade => {
                const shadeElement = document.createElement('div');
                shadeElement.classList.add('palette-shade', `shade-${shade}`);
                shadeElement.setAttribute('data-color', shade);
                shadeElement.style.backgroundColor = palette.palette[shade];
                paletteContainer.appendChild(shadeElement);
            });

            // Configure dropdown buttons
            const deleteButton = element.querySelector('.delete-button');
            if (deleteButton) {
                deleteButton.setAttribute('data-delete-type', 'neutral-palette');
            }

            // Hide dropdown by default
            const dropdown = element.querySelector('.palette-dropdown');
            if (dropdown) dropdown.style.display = 'none';

            container.appendChild(element);
        });
    },

    handleShadeSelection(shade, modalType = 'create') {
        const { modalId } = this.getModalElements(modalType);
        const modal = document.getElementById(modalId);
        if (!modal) return;

        // Remove selected class from all shades first
        modal.querySelectorAll('.palette-shade.selected').forEach(s => s.classList.remove('selected'));
        
        // Add selected class to clicked shade
        shade.classList.add('selected');
        
        // Update hex input with selected color
        const hexInput = modal.querySelector(`#${modalType === 'edit' ? 'edit-' : ''}palette-hex-input`);
        if (hexInput) {
            const color = window.ColorUtils.rgbToHex(shade.style.backgroundColor);
            hexInput.value = color;
        }
    },

    handleHexInput(modalType, hexColor) {
        if (!hexColor) return;
        
        const { modalId } = this.getModalElements(modalType);
        const modal = document.getElementById(modalId);
        if (!modal) return;

        // Validate hex color
        if (!window.ColorUtils.isValidHexColor(hexColor)) {
            alert('Please enter a valid hex color (e.g., #f49d0c or f49d0c)');
            return;
        }

        // Ensure hex color starts with #
        const formattedHex = hexColor.startsWith('#') ? hexColor : '#' + hexColor;

        // Update selected shade color
        const selectedShade = modal.querySelector('.palette-container.custom .palette-shade.selected');
        if (selectedShade) {
            selectedShade.style.backgroundColor = formattedHex;
        }
    },

    // Add new method for neutral palette deletion
    async deleteNeutralPalette(paletteId) {
        const palette = this.neutralPalettes.find(p => p.id === paletteId);
        if (!palette) return false;

        // Update the neutral palettes array
        this.neutralPalettes = this.neutralPalettes.filter(p => p.id !== paletteId);
        
        // Save to MemberStack
        await window.StateManager.saveNeutralPalettes(this.neutralPalettes);

        // If this palette was selected, switch to default
        const input = document.querySelector(`input[value="${paletteId}"]`);
        if (input?.checked) {
            const defaultNeutral = document.querySelector('input[name="neutral-palettes"][value="azure"]');
            if (defaultNeutral) {
                defaultNeutral.checked = true;
                window.StyleManager.updateNeutralPalette('azure');
            }
        }

        // Remove from DOM
        const wrapper = input?.closest('.radio-button-card.custom');
        if (wrapper) {
            wrapper.remove();
        }

        // Show success notification
        window.DOMUtils.showNotification(`Neutral palette "${palette.name}" was deleted successfully`);
        return true;
    }
};

// Event Manager
window.EventManager = {
    handlers: {
        click: new Map(),
        change: new Map(),
        keydown: new Map(),
        paste: new Map(),
        blur: new Map()
    },

    initialize() {
        // Set up global event delegation
        Object.keys(this.handlers).forEach(eventType => {
            document.addEventListener(eventType, (e) => this.handleEvent(eventType, e));
        });

        this.registerHandlers();
    },

    registerHandlers() {
        this.registerClickHandlers();
        this.registerChangeHandlers();
        this.registerInputHandlers();
        this.registerDropdownHandlers();
        this.registerDeleteHandlers();
    },

    registerClickHandlers() {
        // Theme management
        this.addHandler('click', '#download-theme-button', () => window.ThemeManager.downloadTheme());
        this.addHandler('click', '#add-theme-button', () => window.ThemeManager.createNewTheme());

        // Theme editing handlers
        this.addHandler('click', '[data-edit-type="theme"]', (e) => {
            const wrapper = e.target.closest('.radio-button-card');
            const themeId = wrapper.querySelector('input[type="radio"]').value;
            window.ThemeManager.editTheme(themeId);
            
            // Hide the dropdown
            const dropdown = e.target.closest('.theme-dropdown');
            if (dropdown) dropdown.style.display = 'none';
        });

        // Theme update handler (refresh button)
        this.addHandler('click', '[data-update-type="theme"]', async (e) => {
            const wrapper = e.target.closest('.radio-button-card');
            const themeId = wrapper.querySelector('input[type="radio"]').value;
            // Find the neutral-button by searching the clicked container
            const container = e.target.closest('[data-update-type="theme"]');
            const button = container?.querySelector('.neutral-button');
            
            try {
                const success = await window.ThemeManager.saveThemeState(themeId);
                if (success && button) {
                    await window.DOMUtils.showSaveAnimation(button);
                }
            } catch (error) {
                console.error('Error updating theme:', error);
            }
            
            // Hide the dropdown
            const dropdown = e.target.closest('.theme-dropdown');
            if (dropdown) dropdown.style.display = 'none';
        });

        // Theme delete handler
        this.addHandler('click', '[data-delete-type="theme"]', (e) => {
            const wrapper = e.target.closest('.radio-button-card');
            const themeId = wrapper.querySelector('input[type="radio"]').value;
            window.ThemeManager.deleteTheme(themeId);
            
            // Hide the dropdown
            const dropdown = e.target.closest('.theme-dropdown');
            if (dropdown) dropdown.style.display = 'none';
        });

        this.addHandler('click', '#save-edit-theme-button', async () => {
            const modal = document.getElementById('edit-theme-lightbox-modal');
            const themeId = modal.dataset.themeId;
            const nameInput = modal.querySelector('#Edit-Theme-Name');
            const descInput = modal.querySelector('#Edit-Theme-Description');
            
            const name = nameInput.value.trim();
            if (!name) {
                alert('Please enter a theme name');
                return;
            }
            
            const updates = {
                name: name,
                description: descInput?.value.trim() || ''
            };
            
            if (await window.ThemeManager.saveEditedTheme(themeId, updates)) {
                modal.style.display = 'none';
            }
        });

        this.addHandler('click', '#close-edit-theme-modal', () => {
            document.getElementById('edit-theme-lightbox-modal').style.display = 'none';
        });

        // Close modal handlers for all modals
        const modalCloseSelectors = [
            '#close-create-palette-modal',
            '#close-edit-palette-modal',
            '#close-create-neutral-palette-modal',
            '#close-delete-palette-modal',
            '.modal-close-button',  // Generic class for any modal close button
            '.lightbox-modal-overlay'  // Click on overlay to close
        ];

        modalCloseSelectors.forEach(selector => {
            this.addHandler('click', selector, (e) => {
                // If clicking overlay, only close if clicked directly on overlay
                if (selector === '.lightbox-modal-overlay' && e.target !== e.currentTarget) return;
                
                // Find the closest modal and hide it
                const modal = e.target.closest('.lightbox-modal');
                if (modal) {
                    modal.style.display = 'none';
                    // Clear any input fields
                    modal.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
                    // Clear any selected shades
                    modal.querySelectorAll('.palette-shade.selected').forEach(shade => shade.classList.remove('selected'));
                }
            });
        });

        // Palette creation
        this.addHandler('click', '#show-create-palette-modal', () => {
            document.getElementById('create-palette-lightbox-modal').style.display = 'flex';
            window.CustomPalettesManager.initializePaletteModal('create');
        });
        this.addHandler('click', '#save-new-palette-button', () => {
            window.CustomPalettesManager.handlePaletteAction('create');
        });

        // Palette editing
        this.addHandler('click', '#edit-palette-lightbox-modal .palette-container.custom .palette-shade', (e) => {
            window.CustomPalettesManager.handleShadeSelection(e.target, 'edit');
        });
        this.addHandler('click', '#create-palette-lightbox-modal .palette-container.custom .palette-shade', (e) => {
            window.CustomPalettesManager.handleShadeSelection(e.target, 'create');
        });

        // Shade management buttons
        ['edit', 'create'].forEach(modalType => {
            const prefix = modalType === 'edit' ? 'edit-' : '';
            this.addHandler('click', `#${prefix}increase-shades-btn`, () => {
                window.CustomPalettesManager.handleShadeManagement('increase', modalType);
            });
            this.addHandler('click', `#${prefix}decrease-shades-btn`, () => {
                window.CustomPalettesManager.handleShadeManagement('decrease', modalType);
            });
        });

        // Edit palette modal
        this.addHandler('click', '[data-edit-type="palette"]', (e) => {
            const wrapper = e.target.closest('.radio-button-card');
            if (!wrapper) return;
            
            const radio = wrapper.querySelector('input[type="radio"]');
            if (!radio) return;
            
            const paletteId = radio.value;
            const modal = document.getElementById('edit-palette-lightbox-modal');
            
            if (modal) {
                modal.style.display = 'flex';
                window.CustomPalettesManager.initializePaletteModal('edit', paletteId);
                
                // Hide the dropdown
                const dropdown = e.target.closest('.palette-dropdown');
                if (dropdown) dropdown.style.display = 'none';
            }
        });

        this.addHandler('click', '#save-edit-palette-button', () => {
            window.CustomPalettesManager.handlePaletteAction('edit');
        });

        // Neutral palette creation
        this.addHandler('click', '#show-create-neutral-palette-modal', () => {
            const modal = document.getElementById('create-neutral-palette-modal');
            const hexInput = document.getElementById('neutral-palette-hex-input');
            const saveButton = document.getElementById('save-neutral-palette-button');
            const paletteContainer = modal.querySelector('.palette-container');
            
            // Reset the modal state
            modal.style.display = 'flex';
            if (hexInput) {
                hexInput.value = '';
                hexInput.focus();
            }
            if (paletteContainer) {
                paletteContainer.innerHTML = '';
            }
            if (saveButton) {
                saveButton.classList.add('disabled');
                saveButton.style.opacity = '0.5';
                saveButton.style.pointerEvents = 'none';
            }
        });

        this.addHandler('click', '#generate-neutral-palette-button', async () => {
            const hexInput = document.getElementById('neutral-palette-hex-input');
            const hexColor = hexInput.value.trim();
            const generateButton = document.getElementById('generate-neutral-palette-button');
            const saveButton = document.getElementById('save-neutral-palette-button');
            
            if (!hexColor) {
                alert('Please enter a hex color');
                return;
            }

            if (!ColorUtils.isValidHexColor(hexColor)) {
                alert('Please enter a valid hex color (e.g., #f49d0c or f49d0c)');
                return;
            }

            try {
                generateButton.textContent = 'Generating...';
                generateButton.disabled = true;
                
                const success = await window.CustomPalettesManager.generateNeutralPalette(hexColor);
                if (success) {
                    // Enable save button after successful generation
                    saveButton.classList.remove('disabled');
                    saveButton.style.opacity = '1';
                    saveButton.style.pointerEvents = 'auto';
                }
            } finally {
                generateButton.textContent = '✨ Generate Palette';
                generateButton.disabled = false;
            }
        });

        this.addHandler('click', '#save-neutral-palette-button', async () => {
            await window.CustomPalettesManager.saveNeutralPalette();
        });
    },

    registerChangeHandlers() {
        // Radio group handlers
        const radioGroups = {
            'theme-colors': (value) => {
                if (value.startsWith('custom-')) {
                    const colors = Array.from(document.querySelector(`input[value="${value}"]`)
                        ?.closest('.radio-button-card.custom')
                        ?.querySelectorAll('.palette-shade') || [])
                        .map(shade => ColorUtils.rgbToHex(shade.style.backgroundColor));
                    window.StyleManager.updateDataColors({ colors });
                } else {
                    window.StyleManager.updateDataColors(value);
                }
            },
            'color-mode': (value) => window.StyleManager.updateColorMode(value),
            'neutral-palettes': (value) => window.StyleManager.updateNeutralPalette(value),
            'background': (value) => window.StyleManager.updateBackgroundStyle(value),
            'borders': (value) => window.StyleManager.updateBorderRadius(value),
            'font-family': (value) => window.StyleManager.updateFontFamily(value),
            'themes': (value) => {
                const theme = value === 'default' 
                    ? window.ThemeManager.defaultTheme 
                    : window.ThemeManager.themes.find(t => t.id === value);
                if (theme) window.ThemeManager.applyTheme(theme);
            }
        };

        Object.entries(radioGroups).forEach(([name, handler]) => {
            this.addHandler('change', `input[name="${name}"]`, (e) => {
                if (e.target.checked) handler(e.target.value);
            });
        });

        // Borders checkbox handler
        this.addHandler('change', '#borders-checkbox', (e) => {
            window.StyleManager.updateBorderVisibility(e.target.checked);
        });
    },

    registerInputHandlers() {
        // Hex input handlers
        ['edit', 'create'].forEach(modalType => {
            const inputId = modalType === 'edit' ? 'edit-palette-hex-input' : 'palette-hex-input';
            
            this.addHandler('keydown', `#${inputId}`, (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    window.CustomPalettesManager.handleHexInput(modalType, e.target.value.trim());
                }
            });

            this.addHandler('blur', `#${inputId}`, (e) => {
                window.CustomPalettesManager.handleHexInput(modalType, e.target.value.trim());
            });
        });

        // Coolors URL paste handlers
        ['edit', 'create'].forEach(modalType => {
            const urlInputId = modalType === 'edit' ? 'edit-coolors-url' : 'coolors-url';
            this.addHandler('paste', `#${urlInputId}`, (e) => {
                setTimeout(() => {
                    const url = e.target.value.trim();
                    window.CustomPalettesManager.handleCoolorsUrl(modalType, url);
                    e.target.value = '';
                }, 0);
            });
        });
    },

    registerDropdownHandlers() {
        // Handle ellipsis button click
        this.addHandler('click', '.ellipsis-button, .ellipsis-button img', (e) => {
            e.preventDefault();  // Prevent event from bubbling
            e.stopPropagation();
            
            // Get the ellipsis button element (whether clicked directly or via img)
            const ellipsisButton = e.target.classList.contains('ellipsis-button') ? 
                e.target : e.target.closest('.ellipsis-button');
                
            // Find the dropdown within the same radio-button-card or theme-wrapper
            const wrapper = ellipsisButton.closest('.radio-button-card, .theme-wrapper');
            const dropdown = wrapper?.querySelector('.palette-dropdown, .theme-dropdown');
            
            if (!dropdown) return;
            
            // Close all other dropdowns first
            document.querySelectorAll('.palette-dropdown, .theme-dropdown').forEach(d => {
                if (d !== dropdown) d.style.display = 'none';
            });
            
            // Toggle the clicked dropdown
            const isVisible = dropdown.style.display === 'block';
            dropdown.style.display = isVisible ? 'none' : 'block';
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.ellipsis-button') && !e.target.closest('.palette-dropdown') && !e.target.closest('.theme-dropdown')) {
                document.querySelectorAll('.palette-dropdown, .theme-dropdown').forEach(d => {
                    d.style.display = 'none';
                });
            }
        });
    },

    registerDeleteHandlers() {
        // Delete palette handlers
        this.addHandler('click', '[data-delete-type="palette"]', (e) => {
            const wrapper = e.target.closest('.radio-button-card.custom');
            const paletteId = wrapper.querySelector('input[type="radio"]').value;
            window.CustomPalettesManager.deletePalette(paletteId);
            const dropdown = e.target.closest('.palette-dropdown');
            if (dropdown) dropdown.style.display = 'none';
        });

        // Delete neutral palette handler
        this.addHandler('click', '.delete-button', (e) => {
            const deleteButton = e.target.closest('.delete-button');
            if (!deleteButton) return;
            
            const radioCard = deleteButton.closest('.radio-button-card');
            if (!radioCard) return;

            const input = radioCard.querySelector('input[type="radio"][name="neutral-palettes"]');
            if (!input) return;
            
            const paletteId = input.value;
            if (!paletteId) return;
            
            const palette = window.CustomPalettesManager.neutralPalettes.find(p => p.id === paletteId);
            if (!palette) return;
            
            // Show confirmation modal
            const lightboxModal = document.getElementById('delete-palette-lightbox-modal');
            const messageElement = lightboxModal.querySelector('.delete-message');
            
            if (messageElement) {
                messageElement.textContent = `Are you sure you want to delete "${palette.name}"?`;
            }
            
            // Store the palette ID and type for use in the confirmation handler
            lightboxModal.dataset.paletteId = paletteId;
            lightboxModal.dataset.isNeutralPalette = 'true';
            
            // Show the modal
            lightboxModal.style.display = 'flex';
            
            // Hide the dropdown
            const dropdown = deleteButton.closest('.palette-dropdown');
            if (dropdown) dropdown.style.display = 'none';
        });

        // Delete theme handler
        this.addHandler('click', '.delete-button-theme', (e) => {
            const wrapper = e.target.closest('.radio-button-card');
            const themeId = wrapper.querySelector('input[type="radio"]').value;
            if (window.ThemeManager.deleteTheme(themeId)) {
                wrapper.remove();
                if (wrapper.querySelector('input[type="radio"]').checked) {
                    const defaultRadio = document.querySelector('input[name="themes"][value="default"]');
                    if (defaultRadio) {
                        defaultRadio.checked = true;
                        window.ThemeManager.applyDefaultTheme();
                    }
                }
            }
        });

        // Delete confirmation modal handlers
        this.addHandler('click', '#confirm-delete-palette-button', async () => {
            const modal = document.getElementById('delete-palette-lightbox-modal');
            const paletteId = modal.dataset.paletteId;
            const isNeutralPalette = modal.dataset.isNeutralPalette === 'true';
            const hasAffectedThemes = modal.dataset.hasAffectedThemes === 'true';
            
            if (isNeutralPalette) {
                await window.CustomPalettesManager.deleteNeutralPalette(paletteId);
            } else {
                if (window.CustomPalettesManager.confirmDeletePalette(paletteId, hasAffectedThemes)) {
                    const wrapper = document.querySelector(`input[value="${paletteId}"]`)?.closest('.custom-palette-wrapper');
                    if (wrapper) wrapper.remove();
                }
            }
            
            modal.style.display = 'none';
        });

        this.addHandler('click', '#cancel-delete-palette-button, #close-delete-palette-modal', () => {
            document.getElementById('delete-palette-lightbox-modal').style.display = 'none';
        });

        // Theme deletion modal handlers
        this.addHandler('click', '#confirm-delete-theme-button', () => {
            const modal = document.getElementById('delete-theme-lightbox-modal');
            const themeId = modal.dataset.themeId;
            const themeName = window.ThemeManager.themes.find(t => t.id === themeId)?.name;
            
            if (window.ThemeManager.confirmDeleteTheme(themeId)) {
                const wrapper = document.querySelector(`input[value="${themeId}"]`)?.closest('.theme-wrapper');
                if (wrapper) {
                    // If this was the active theme, switch to default
                    if (wrapper.querySelector('input[type="radio"]').checked) {
                        const defaultRadio = document.querySelector('input[name="themes"][value="default"]');
                        if (defaultRadio) {
                            defaultRadio.checked = true;
                            window.ThemeManager.applyDefaultTheme();
                        }
                    }
                    wrapper.remove();
                    
                    // Show success notification
                    window.DOMUtils.showNotification(`Theme "${themeName}" was deleted successfully`);
                }
            }
            
            modal.style.display = 'none';
        });

        this.addHandler('click', '#cancel-delete-theme-button, #close-delete-theme-modal', () => {
            document.getElementById('delete-theme-lightbox-modal').style.display = 'none';
        });
    },

    addHandler(eventType, selector, handler) {
        if (!this.handlers[eventType]) {
            this.handlers[eventType] = new Map();
        }
        this.handlers[eventType].set(selector, handler);
    },

    handleEvent(eventType, event) {
        let handled = false;
        for (const [selector, handler] of this.handlers[eventType]) {
            if (event.target.matches(selector) || event.target.closest(selector)) {
                handler(event);
                if (event.defaultPrevented) {
                    handled = true;
                    break;
                }
            }
        }
        return handled;
    }
};

// Theme Manager
window.ThemeManager = {
    themes: [],
    isApplyingTheme: false,
    isDownloading: false,

    // Default theme configuration
    defaultTheme: {
        dataPalette: 'power-ui',
        neutralPalette: 'azure',
        fontFamily: 'segoe-ui',
        colorMode: 'light',
        borders: '4',
        bgStyle: 'default',
        showBorders: true
    },

    // Theme property to style mapping
    styleMapping: {
        dataPalette: (value) => window.StyleManager.updateDataColors(value),
        neutralPalette: (value) => window.StyleManager.updateNeutralPalette(value),
        fontFamily: (value) => window.StyleManager.updateFontFamily(value),
        colorMode: (value) => window.StyleManager.updateColorMode(value),
        borders: (value) => window.StyleManager.updateBorderRadius(value),
        bgStyle: (value) => window.StyleManager.updateBackgroundStyle(value),
        showBorders: (value) => window.StyleManager.updateBorderVisibility(value)
    },

    // Radio group mapping
    radioGroups: {
        dataPalette: 'theme-colors',
        neutralPalette: 'neutral-palettes',
        fontFamily: 'font-family',
        colorMode: 'color-mode',
        borders: 'borders',
        bgStyle: 'background'
    },

    async initialize() {
        try {
            this.themes = window.StateManager.memberData.themes || [];
            this.setDefaultSelections();
            await this.renderSavedThemes();
            
            // Select default theme if none selected
            const selectedTheme = document.querySelector('input[name="themes"]:checked');
            if (!selectedTheme) {
                DOMUtils.setRadioChecked('themes', 'default', true) && this.applyDefaultTheme();
            }
        } catch (error) {
            console.error("Error initializing themes:", error);
        }
    },

    setDefaultSelections() {
        // Clear all radio selections and set defaults
        Object.entries(this.defaultTheme).forEach(([prop, value]) => {
            const radioGroup = this.radioGroups[prop];
            if (radioGroup) {
                DOMUtils.clearRadioGroup(radioGroup);
                DOMUtils.setRadioChecked(radioGroup, value);
                this.applyStyle(prop, value);
            }
        });

        // Handle border checkbox
        const borderToggle = document.getElementById('borders-checkbox');
        if (borderToggle) {
            DOMUtils.setCheckboxState(borderToggle, this.defaultTheme.showBorders);
            window.StyleManager.updateBorderVisibility(this.defaultTheme.showBorders);
        }
    },

    applyStyle(prop, value) {
        this.styleMapping[prop]?.(value);
    },

    async applyTheme(theme) {
        if (this.isApplyingTheme) return;
        this.isApplyingTheme = true;

        try {
            // Clear and apply all radio settings
            Object.entries(theme)
                .filter(([prop]) => this.radioGroups[prop])
                .forEach(([prop, value]) => {
                    DOMUtils.clearRadioGroup(this.radioGroups[prop]);
                    DOMUtils.setRadioChecked(this.radioGroups[prop], value);
                    this.applyStyle(prop, value);
                });

            // Handle borders checkbox
            const borderToggle = document.getElementById('borders-checkbox');
            if (borderToggle) {
                DOMUtils.setCheckboxState(borderToggle, theme.showBorders);
                window.StyleManager.updateBorderVisibility(theme.showBorders);
            }

            // Handle custom palette
            if (theme.dataPalette?.startsWith('custom-')) {
                const colors = Array.from(document.querySelector(`input[value="${theme.dataPalette}"]`)
                    ?.closest('.radio-button-card.custom')
                    ?.querySelectorAll('.palette-shade') || [])
                    .map(shade => ColorUtils.rgbToHex(shade.style.backgroundColor));
                if (colors.length) window.StyleManager.updateDataColors({ colors });
            }
        } catch (error) {
            console.error('Error applying theme:', error);
        } finally {
            this.isApplyingTheme = false;
        }
    },

    applyDefaultTheme() {
        this.applyTheme(this.defaultTheme);
    },

    async renderSavedThemes() {
        if (!Array.isArray(this.themes)) {
            console.error('Invalid themes array:', this.themes);
            return;
        }

        const container = document.getElementById('themes-container');
        const template = document.getElementById('theme-template');
        if (!container || !template) return;

        // Clear existing themes except template and headers
        Array.from(container.children).forEach(child => {
            if (child !== template && 
                !child.classList.contains('section-header-container') && 
                !child.classList.contains('section-subtitle')) {
                child.remove();
            }
        });

        // Render themes
        this.themes.forEach(theme => this.createThemeElement(theme));
    },

    createThemeElement(theme) {
        const container = document.getElementById('themes-container');
        const template = document.getElementById('theme-template');
        if (!container || !template) return;

        const element = DOMUtils.createThemeElement(template, theme);
        container.appendChild(element);
        this.initializeThemeFunctionality(element);
    },

    initializeThemeFunctionality(element) {
        // Look for refresh icon instead of floppy disk
        const saveButton = element.querySelector('.neutral-button img[src*="refresh"]')?.parentElement;
        if (saveButton) {
            // Add save functionality
            const themeId = element.querySelector('input[type="radio"]').value;
            saveButton.addEventListener('click', async () => {
                try {
                    const success = await this.saveThemeState(themeId);
                    if (success) {
                        await DOMUtils.showSaveAnimation(saveButton);
                    }
                } catch (error) {
                    console.error('Error saving theme:', error);
                }
            });
        }
    },

    async downloadTheme() {
        if (this.isDownloading) return;
        this.isDownloading = true;

        try {
            // Get current neutral palette
            const selectedNeutralPalette = document.querySelector('input[name="neutral-palettes"]:checked')?.value || 'azure';
            let neutralPaletteData = {};
            
            if (selectedNeutralPalette.startsWith('neutral-')) {
                // For custom neutral palettes
                const customPalette = window.CustomPalettesManager.neutralPalettes.find(p => p.id === selectedNeutralPalette);
                if (customPalette) {
                    neutralPaletteData = customPalette.palette;
                }
            } else {
                // For built-in palettes, get computed values
                const shades = ['25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
                shades.forEach(shade => {
                    neutralPaletteData[shade] = getComputedStyle(document.documentElement)
                        .getPropertyValue(`--neutral-${shade}`).trim();
                });
            }

            // Get current theme state
            const themeData = {
                mode: document.querySelector('input[name="color-mode"]:checked')?.value || 'light',
                neutralPalette: neutralPaletteData,
                fontFamily: document.querySelector('input[name="font-family"]:checked')?.value || 'segoe-ui',
                borderRadius: document.querySelector('input[name="borders"]:checked')?.value || '4',
                name: "Custom Theme",
                dataColors: Array.from({ length: 8 }, (_, i) => 
                    getComputedStyle(document.documentElement).getPropertyValue(`--theme-color${i + 1}`).trim()
                ).filter(color => color !== 'none'),
                showBorders: document.getElementById('borders-checkbox')?.checked ?? true,
                bgStyle: document.querySelector('input[name="background"]:checked')?.value || 'default'
            };

            // Generate and download theme
            const response = await fetch(`${API_URL}/generate-theme`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(themeData)
            });

            if (!response.ok) throw new Error(`Failed to generate theme: ${response.statusText}`);

            // Download the generated theme
            const generatedTheme = await response.json();
            const blob = new Blob([JSON.stringify(generatedTheme, null, 2)], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `${document.querySelector('input[name="themes"]:checked')?.closest('.radio-button-card')?.querySelector('.theme-title')?.textContent?.toLowerCase().replace(/\s+/g, '-') || 'custom'}-theme.json`;
            a.click();
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Error downloading theme:', error);
            alert('Failed to download theme. Please try again.');
        } finally {
            this.isDownloading = false;
        }
    },

    createNewTheme() {
        const newTheme = {
            id: 'theme-' + Date.now(),
            name: 'New Theme',
            ...Object.fromEntries(
                Object.entries(this.radioGroups).map(([prop, groupName]) => [
                    prop,
                    document.querySelector(`input[name="${groupName}"]:checked`)?.value || this.defaultTheme[prop]
                ])
            ),
            showBorders: document.getElementById('borders-checkbox')?.checked ?? this.defaultTheme.showBorders
        };

        this.themes.push(newTheme);
        this.createThemeElement(newTheme);
        this.saveState();
    },

    deleteTheme(themeId) {
        const theme = this.themes.find(t => t.id === themeId);
        if (!theme) return false;

        const modal = document.getElementById('delete-theme-lightbox-modal');
        const messageElement = modal.querySelector('.delete-message');
        
        if (messageElement) {
            messageElement.textContent = `Are you sure you want to delete "${theme.name}"?`;
        }
        
        // Store the theme ID for use in the confirmation handler
        modal.dataset.themeId = themeId;
        
        // Show the modal
        modal.style.display = 'flex';
        return false;
    },

    confirmDeleteTheme(themeId) {
        this.themes = this.themes.filter(t => t.id !== themeId);
        this.saveState();
        return true;
    },

    async saveState() {
        await window.StateManager.saveThemes(this.themes);
    },

    async saveThemeState(themeId) {
        const theme = this.themes.find(t => t.id === themeId);
        if (!theme) return false;

        try {
            // Capture current UI state
            const currentState = Object.fromEntries(
                Object.entries(this.radioGroups).map(([prop, groupName]) => [
                    prop,
                    document.querySelector(`input[name="${groupName}"]:checked`)?.value || this.defaultTheme[prop]
                ])
            );

            // Add checkbox state
            currentState.showBorders = document.getElementById('borders-checkbox')?.checked ?? this.defaultTheme.showBorders;

            // Update theme and save
            Object.assign(theme, currentState);
            await this.saveState();
            return true;
        } catch (error) {
            console.error('Error saving theme state:', error);
            return false;
        }
    },

    editTheme(themeId) {
        const theme = this.themes.find(t => t.id === themeId);
        if (!theme) return false;

        const modal = document.getElementById('edit-theme-lightbox-modal');
        const nameInput = modal.querySelector('#Edit-Theme-Name');
        const descInput = modal.querySelector('#Edit-Theme-Description');
        
        if (nameInput) nameInput.value = theme.name || '';
        if (descInput) descInput.value = theme.description || '';
        
        // Store the theme ID for use in the save handler
        modal.dataset.themeId = themeId;
        
        // Show the modal
        modal.style.display = 'flex';
        return true;
    },

    async saveEditedTheme(themeId, updates) {
        const theme = this.themes.find(t => t.id === themeId);
        if (!theme) return false;

        try {
            // Update theme properties
            Object.assign(theme, updates);
            
            // Update the theme name in the UI
            const themeWrapper = document.querySelector(`input[value="${themeId}"]`)?.closest('.radio-button-card');
            if (themeWrapper) {
                const titleElement = themeWrapper.querySelector('.theme-title');
                if (titleElement) titleElement.textContent = updates.name;
            }
            
            await this.saveState();
            window.DOMUtils.showNotification(`Theme "${updates.name}" was updated successfully`);
            return true;
        } catch (error) {
            console.error('Error saving edited theme:', error);
            return false;
        }
    }
};

// Tooltip Manager
window.TooltipManager = {
    initialize() {
        const tooltip = document.querySelector('.tooltip');
        if (!tooltip) return;
        
        document.addEventListener('mouseover', e => {
            // Find closest parent with tooltip, including the element itself
            const tooltipElement = e.target.closest('[data-tooltip]');
            if (tooltipElement) {
                const text = tooltipElement.getAttribute('data-tooltip');
                tooltip.querySelector('.tooltip-text').textContent = text;
                tooltip.style.display = 'block';
                tooltip.style.left = `${tooltipElement.getBoundingClientRect().right + 10}px`;
                tooltip.style.top = `${tooltipElement.getBoundingClientRect().top}px`;
            }
        });

        document.addEventListener('mouseout', e => {
            // Hide tooltip only when moving out of the element with tooltip or its children
            const tooltipElement = e.target.closest('[data-tooltip]');
            if (tooltipElement && !tooltipElement.contains(e.relatedTarget)) {
                tooltip.style.display = 'none';
            }
        });
    }
};

// Update the initialization to include TooltipManager
document.addEventListener('DOMContentLoaded', async () => {
    await window.StateManager.initialize();
    await window.CustomPalettesManager.initialize();
    await window.ThemeManager.initialize();
    window.EventManager.initialize();
    window.TooltipManager.initialize();
    
    // Apply default theme if no theme is selected
    const selectedTheme = document.querySelector('input[name="themes"]:checked');
    if (!selectedTheme) {
        window.ThemeManager.applyDefaultTheme();
    }
});
