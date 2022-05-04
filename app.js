(function () {
  let state = {
    bill: 0,
    tip: 0,
    people: 0,
    zero: true,
  };

  // Select the elements
  const billEl = document.querySelector('#bill');
  const peopleEl = document.querySelector('#people');
  const tipContainerEl = document.querySelector('.calculator__tip');
  const formEl = document.querySelector('.calculator__form');
  const customEl = document.querySelector('#custom');
  const billContainerEl = document.querySelector('#billContainer');
  const peopleContainerEl = document.querySelector('#peopleContainer');
  const tipAmountEl = document.querySelector('#tipAmount');
  const totalEl = document.querySelector('#total');
  const resetEl = document.querySelector('.tip__reset');

  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  billEl.addEventListener('input', () => {
    state = getValue(billEl, 'bill');
    updateUi();
  });

  peopleEl.addEventListener('input', () => {
    state = getValue(peopleEl, 'people');
    updateUi();
  });

  customEl.addEventListener('input', () => {
    state = getValue(customEl, 'tip');
    updateUi();
  });

  let activeBtn = undefined;

  tipContainerEl.addEventListener('click', (e) => {
    const selectedBtn =
      e.path[0].localName === 'button' ? e.path[0] : undefined;

    if (selectedBtn && !activeBtn) {
      selectedBtn.classList.toggle('btn--selected');
      activeBtn = selectedBtn;
      state = getValue(activeBtn, 'tip');
      updateUi();
    } else if (selectedBtn !== activeBtn && selectedBtn) {
      activeBtn.classList.toggle('btn--selected');
      selectedBtn.classList.toggle('btn--selected');
      activeBtn = selectedBtn;
      state = getValue(activeBtn, 'tip');
      updateUi();
    } else if (selectedBtn === activeBtn && activeBtn) {
      activeBtn.classList.toggle('btn--selected');
      activeBtn = undefined;
    } else if (e.path[0].localName === 'input') {
      state = getValue(e.path[0], 'tip');
      activeBtn.classList.toggle('btn--selected');
      activeBtn = undefined;
      updateUi();
    } else if (e.path[0].localName === 'input' && activeBtn) {
      activeBtn.classList.toggle('btn--selected');
      state = getValue(activeBtn, 'tip');
      activeBtn = undefined;
      updateUi();
    }
  });

  resetEl.addEventListener('click', () => {
    resetUi();
  });

  function getValue(domElement, stateEl) {
    if (!domElement.value) {
      const newArr = domElement.innerText.split('');
      newArr.pop();

      return {
        ...state,
        [stateEl]: newArr.join('') * 1,
      };
    }

    return {
      ...state,
      [stateEl]: domElement.value * 1,
    };
  }

  function calculateTip() {
    if (state.zero) {
      return state;
    }

    const newState = {
      ...state,
    };

    newState.tipPerPerson =
      Math.round(
        ((newState.bill * (newState.tip / 100)) / newState.people) * 100
      ) / 100;
    newState.totalPerPerson =
      Math.round(
        (newState.bill * (newState.tip / 100)) / newState.people +
          newState.bill * 100
      ) / 100;

    console.log(newState);

    return newState;
  }

  function checkZero() {
    if (state.bill === 0) {
      billContainerEl.classList.add('error');
      resetEl.style.background = 'rgba(38, 194, 174, 0.2)';

      return {
        ...state,
        zero: true,
      };
    } else {
      billContainerEl.classList.remove('error');
    }

    if (state.people === 0) {
      peopleContainerEl.classList.add('error');
      resetEl.style.background = 'rgba(38, 194, 174, 0.2)';

      return {
        ...state,
        zero: true,
      };
    } else {
      peopleContainerEl.classList.remove('error');
    }

    if (state.people > 0 && state.bill > 0) {
      resetEl.style.background = '#26c2ae';

      return {
        ...state,
        zero: false,
      };
    }

    return {
      ...state,
    };
  }

  function updateUi() {
    console.log(state);
    state = checkZero();
    state = calculateTip();
    tipAmountEl.innerText = state.tipPerPerson || '0.00';
    totalEl.innerText = state.totalPerPerson || '0.00';
  }

  function resetUi() {
    state = {
      bill: 0,
      tip: 0,
      people: 0,
      zero: true,
    };

    billEl.value = 0;
    peopleEl.value = 0;
    customEl.value = 0;

    activeBtn = undefined;

    for (let i = 0; i < tipContainerEl.children.length - 1; i++) {
      tipContainerEl.children[i].classList.remove('btn--selected');
    }

    updateUi();
  }
})();

// Check the how much the tip is going to be

// Get the amount of the bill

// Get the number of people

// Verify that the bill and number of people are at 0, if not, change reset button to active state

// reset the app state
