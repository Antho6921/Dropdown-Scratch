// Extension Scratch : Liste déroulante
(function(Scratch) {
    'use strict';

    class DropdownExtension {
        constructor() {
            // Liste initiale
            this.dropdownList = [];
            this.selectedItem = null;
            this.dropdownVisible = false; // État de visibilité du menu déroulant
        }

        getInfo() {
            return {
                id: 'dropdownExtension',
                name: 'Liste déroulante',
                blocks: [
                    {
                        opcode: 'addItem',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'ajouter élément [TEXT] avec valeur [VALUE]',
                        arguments: {
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Nom de l\'élément'
                            },
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Valeur'
                            }
                        }
                    },
                    {
                        opcode: 'showDropdown',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'afficher la liste déroulante',
                    },
                    {
                        opcode: 'hideDropdown',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'cacher la liste déroulante',
                    },
                    {
                        opcode: 'getSelectedItem',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'élément sélectionné'
                    },
                    {
                        opcode: 'setItemAvailability',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'rendre élément [TEXT] disponible : [AVAILABLE]',
                        arguments: {
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Nom de l\'élément'
                            },
                            AVAILABLE: {
                                type: Scratch.ArgumentType.BOOLEAN,
                                defaultValue: true
                            }
                        }
                    }
                ]
            };
        }

        addItem(args) {
            const { TEXT, VALUE } = args;
            this.dropdownList.push({ text: TEXT, value: VALUE, available: true });
        }

        showDropdown() {
            const availableItems = this.dropdownList.filter(item => item.available);

            if (availableItems.length === 0) {
                alert('Aucun élément disponible dans la liste déroulante');
                return;
            }

            this.dropdownVisible = true;
            Scratch.vm.runtime.requestRedraw(); // Demande une redessine de la scène
        }

        hideDropdown() {
            this.dropdownVisible = false;
            Scratch.vm.runtime.requestRedraw(); // Demande une redessine de la scène
        }

        getSelectedItem() {
            return this.selectedItem ? this.selectedItem.value : 'Aucun élément sélectionné';
        }

        setItemAvailability(args) {
            const { TEXT, AVAILABLE } = args;
            const item = this.dropdownList.find(item => item.text === TEXT);
            if (item) {
                item.available = AVAILABLE;
            } else {
                alert(`L'élément "${TEXT}" n'existe pas dans la liste.`);
            }
        }

        draw(ctx) {
            if (!this.dropdownVisible) return;

            const x = 10, y = 10, width = 200, itemHeight = 30;
            const visibleItems = this.dropdownList.filter(item => item.available);

            // Dessiner le fond du menu déroulant
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 2;
            ctx.fillRect(x, y, width, visibleItems.length * itemHeight);
            ctx.strokeRect(x, y, width, visibleItems.length * itemHeight);

            // Dessiner chaque option avec interaction
            ctx.fillStyle = 'black';
            ctx.font = '16px Arial';
            visibleItems.forEach((item, index) => {
                ctx.fillText(item.text, x + 10, y + (index + 1) * itemHeight - 10);

                // Détecter le clic sur une option
                const mouseX = Scratch.vm.runtime.ioDevices.mouse.x;
                const mouseY = Scratch.vm.runtime.ioDevices.mouse.y;
                const clicked = Scratch.vm.runtime.ioDevices.mouse.buttonsPressed.includes('left');

                if (clicked && mouseX >= x && mouseX <= x + width &&
                    mouseY >= y + index * itemHeight && mouseY <= y + (index + 1) * itemHeight) {
                    this.selectedItem = item;
                    this.hideDropdown(); // Masquer la liste après la sélection
                }
            });
        }
    }

    Scratch.extensions.register(new DropdownExtension());
})(Scratch);
