'use strict';

/**@type {{[k: string]: ModdedItemData}} */
let BattleItems = {
	blueorb: {
		inherit: true,
		onSwitchIn: function (pokemon) {
			if (pokemon.isActive && !pokemon.template.isPrimal) {
				this.insertQueue({pokemon: pokemon, choice: 'runPrimal'});
			}
		},
		onPrimal: function (pokemon) {
			/**@type {Template} */
			// @ts-ignore
			let template = this.getMixedTemplate(pokemon.originalSpecies, 'Kyogre-Primal');
			if (pokemon.originalSpecies === 'Kyogre') {
				pokemon.formeChange(template, this.effect, true);
			} else {
				pokemon.formeChange(template, this.effect, true);
				pokemon.baseTemplate = template;
				this.add('-start', pokemon, 'Blue Orb', '[silent]');
			}
		},
		onTakeItem: function (item) {
			return false;
		},
	},
	redorb: {
		inherit: true,
		onSwitchIn: function (pokemon) {
			if (pokemon.isActive && !pokemon.template.isPrimal) {
				this.insertQueue({pokemon: pokemon, choice: 'runPrimal'});
			}
		},
		onPrimal: function (pokemon) {
			/**@type {Template} */
			// @ts-ignore
			let template = this.getMixedTemplate(pokemon.originalSpecies, 'Groudon-Primal');
			if (pokemon.originalSpecies === 'Groudon') {
				pokemon.formeChange(template, this.effect, true);
			} else {
				pokemon.formeChange(template, this.effect, true);
				pokemon.baseTemplate = template;
				this.add('-start', pokemon, 'Red Orb', '[silent]');
				// @ts-ignore
				let oTemplate = this.getTemplate(pokemon.illusion || pokemon.originalSpecies);
				this.add('-start', pokemon, 'Red Orb', '[silent]');
				if (pokemon.illusion) {
					pokemon.ability = '';
					let types = oTemplate.types;
					if (types.length > 1 || types[types.length - 1] !== 'Fire') {
						this.add('-start', pokemon, 'typechange', (types[0] !== 'Fire' ? types[0] + '/' : '') + 'Fire', '[silent]');
					}
				} else if (oTemplate.types.length !== pokemon.template.types.length || oTemplate.types[1] !== pokemon.template.types[1]) {
					this.add('-start', pokemon, 'typechange', pokemon.template.types.join('/'), '[silent]');
				}
			}
		},
		onTakeItem: function (item) {
			return false;
		},
	},
};

exports.BattleItems = BattleItems;
