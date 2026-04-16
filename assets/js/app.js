'use strict';

const TRANSLATIONS = {
  it: {
    title: 'Easy Numbers',
    number: 'numero',
    numbers: 'numeri',
    howManyNumbers: 'Quanti numeri',
    generateNumbers: 'Genera numeri',
    madeWith: 'Sviluppata con',
  },
  en: {
    title: 'Easy Numbers',
    number: 'number',
    numbers: 'numbers',
    howManyNumbers: 'How many numbers',
    generateNumbers: 'Generate numbers',
    madeWith: 'Built with',
  },
};

function easyNumbersApp() {
  return {
    lang: navigator.language.startsWith('it') ? 'it' : 'en',
    get t() { return TRANSLATIONS[this.lang]; },
    toggleLang() { this.lang = this.lang === 'it' ? 'en' : 'it'; },
    countSelected: null,
    countOptions: [1, 2, 3, 4, 5, 6, 7, 8],
    generatedNumbers: [],
    showSpin: false,
    init() {
      this.$nextTick(() => {
        this.countSelected = 6;
      })
    },

    animateSpin() {
      this.showSpin = true;
      setTimeout(() => {
        this.showSpin = false;
      }, 400); // the duration must be equal to the animation
    },

    generate() {
      this.generatedNumbers = [];
      this.animateSpin();
      for (let i=0; i< this.countSelected; i++) {
        const num = Math.floor(Math.random() * 100) + 1;  
        this.generatedNumbers.push(num);
      }
    }
  };
}
