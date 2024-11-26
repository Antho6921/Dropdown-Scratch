// Extension Scratch : Liste déroulante
(function(Scratch) {
    'use strict';

    class DropdownExtension {
        constructor() {
            // Liste initiale
            this.dropdownList = [];
            this.selectedItem = null;
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

            const itemNames = availableItems.map(item => item.text);
            const selected = prompt('Sélectionnez un élément :\n' + itemNames.join('\n'));

            const selectedItem = availableItems.find(item => item.text === selected);
            if (selectedItem) {
                this.selectedItem = selectedItem;
            } else {
                alert('Élément non valide ou non disponible');
            }
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
    }

    Scratch.extensions.register(new DropdownExtension());
})(Scratch);
