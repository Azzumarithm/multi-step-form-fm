/* Step 1 */

responses = JSON.parse(localStorage.getItem('responses')) || []

stepsCount = 0

const personalForm = document.querySelector('.personal-form')

multipleFormsResponses = {
  
}

//Including Empty String
const isValidName = (name) => /^(?:[A-Za-z]+(?:[ -][A-Za-z]+)*)?$/.test(name);
const isValidEmail = (email) => /^(?:[^\s@]+@[^\s@]+\.[^\s@]+)?$/.test(email);
const isValidPhoneNumber = (phoneNumber) => /^(?:(?:\+\d{1,3}\s?)?(?:\()?\d{1,4}(?:\))?[-\s]?\d{1,4}[-\s]?\d{1,9})?$/.test(phoneNumber);

//Step Variables Tracker 
const stepCircles = document.querySelectorAll('.step-circle')
const stepsContainers = document.querySelectorAll(".steps")

const currentStepCircles = ["one","two","three","four"]

const updateStepCircles = () => {
  stepCircles.forEach((stepCircle, index) => {
    if (index === stepsCount) {
      stepCircle.classList.add("current");
    } else {
      stepCircle.classList.remove("current");
    }
  });
}

updateStepCircles();

//Errors : Step 1
const personalRequiredErrors = document.querySelectorAll('.personal-required-error')
const personalAccurateErrors = document.querySelectorAll('.personal-accurate-error')

const personalInputs = document.querySelectorAll('.personal-input')


const personalValidation = {
  "name-personal": {
    input: null,
    errorClass: "personal-name-error",
    requiredErrorClass: "name-error",
    isValid: isValidName,
  },
  "email-personal": {
    input: null,
    errorClass: "personal-email-error",
    requiredErrorClass: "email-error",
    isValid: isValidEmail,
  },
  "phone-personal": {
    input: null,
    errorClass: "personal-phone-error",
    requiredErrorClass: "phone-error",
    isValid: isValidPhoneNumber,
  },
};

personalInputs.forEach(personalInput => {
  const inputType = Array.from(personalInput.classList).find(className => className.startsWith("name-personal") || className.startsWith("email-personal") || className.startsWith("phone-personal"));
  if (!inputType) return;

  personalValidation[inputType].input = personalInput;

  personalInput.addEventListener("input", (e) => {
    const { input, errorClass, requiredErrorClass, isValid } = personalValidation[inputType];
    const inputValue = e.currentTarget.value;
   
    const errorClasses = [inputType, "error"];

    if (!isValid(inputValue)) {
      personalAccurateErrors.forEach(personalAccurateError => {
        if (personalAccurateError.classList.contains(errorClass)) {
          personalAccurateError.classList.add("error");
        }
      });

      personalRequiredErrors.forEach(personalRequiredError => {
        if (personalRequiredError.classList.contains(requiredErrorClass)) {
          personalRequiredError.classList.remove("error");
        }
      });

      if (input && !errorClasses.every(className => input.classList.contains(className))) {
        input.classList.add("error");
      }

    } else {
      if (input) input.classList.remove("error");

      
      personalAccurateErrors.forEach(personalAccurateError => {
        if (personalAccurateError.classList.contains(errorClass)) {
          personalAccurateError.classList.remove("error");
        }
      });

      personalRequiredErrors.forEach(personalRequiredError => {
        if (personalRequiredError.classList.contains(requiredErrorClass)) {
          personalRequiredError.classList.remove("error");
        }
      });
    }

  });
});



personalForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const personalName = e.target.elements.name.value;
  const personalEmail = e.target.elements.email.value;
  const personalPhone = e.target.elements.phone.value;

  //Excluding empty string
  const isValidName = (name) => /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/.test(name);
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhoneNumber = (phoneNumber) => /^(\+\d{1,3}\s?)?(\()?\d{1,4}(\))?[-\s]?\d{1,4}[-\s]?\d{1,9}$/.test(phoneNumber);

  const isNameValid = isValidName(personalName);
  const isEmailValid = isValidEmail(personalEmail);
  const isPhoneNumberValid = isValidPhoneNumber(personalPhone);

  if (isNameValid && isEmailValid && isPhoneNumberValid) {
    
    const stepOne = {
      name: personalName,
      email: personalEmail,
      phoneNumber: personalPhone,

    };

    
    
    personalInputs.forEach(personalInput => {
      personalInput.classList.remove("error");
    });

    personalRequiredErrors.forEach(personalRequiredError => {
      personalRequiredError.classList.remove('error');
    });

    personalAccurateErrors.forEach(personalAccurateError => {
      personalAccurateError.classList.remove('error');
    });

    stepsContainers.forEach(stepContainer => {
      if(stepContainer.classList.contains("step1-container")){
        stepContainer.classList.add("disabled")
      }

      if(stepContainer.classList.contains("step2-container")){
        stepContainer.classList.remove("disabled")
      }
    })

    stepsCount++
    updateStepCircles();
   
    multipleFormsResponses["personalForm"] = stepOne
       e.target.reset();
  } 
  else 
  {
    if (!isNameValid) {
      handlePersonalInputError("name-personal", "name-error", "personal-name-error");
    }

    if (!isEmailValid) {
      handlePersonalInputError("email-personal", "email-error", "personal-email-error");
    }

    if (!isPhoneNumberValid) {
      handlePersonalInputError("phone-personal", "phone-error", "personal-phone-error");
    }
  }
});

const handlePersonalInputError = (inputType, requiredErrorClass, accurateErrorClass) => {
  personalInputs.forEach(personalInput => {
    if (personalInput.classList.contains(inputType)) {
      personalInput.classList.add('error');
    }
  });

  personalRequiredErrors.forEach(personalRequiredError => {
    if (personalRequiredError.classList.contains(requiredErrorClass)) {
      personalRequiredError.classList.add('error');
    }
  });

  personalAccurateErrors.forEach(personalAccurateError => {
    if (personalAccurateError.classList.contains(accurateErrorClass)) {
      personalAccurateError.classList.remove('error');
    }
  });
}


/* STEP 2 */
//Check if step two container is enabled
const stepTwoContainer = document.querySelector('.step2-container')
const planForm = document.querySelector(".plan-form")
const backToStepOneBtn = document.querySelector(".select-plan.back-btn");

const planSubcontainers = document.querySelectorAll(".plan-subcontainer")

backToStepOneBtn.addEventListener("click", (e) => {
  const personalNameInput = document.querySelector('.name-personal')
  const personalEmailInput = document.querySelector('.email-personal')
  const personalPhoneInput = document.querySelector('.phone-personal')

  stepsContainers.forEach((stepContainer) => {

    if (stepContainer.classList.contains("step1-container")) {
      stepContainer.classList.remove("disabled");
      personalNameInput.value = multipleFormsResponses["personalForm"].name
      personalEmailInput.value = multipleFormsResponses["personalForm"].email
      personalPhoneInput.value = multipleFormsResponses["personalForm"].phoneNumber

      multipleFormsResponses["personalForm"] = {}
    }

    if (stepContainer.classList.contains("step2-container")) {
      stepContainer.classList.add("disabled");
      stepsCount--;
           updateStepCircles();
    }
  });

   
});



if (stepTwoContainer) {
  const checkbox = document.getElementById('check');
  const monthlyButton = document.querySelector('.monthly-button');
  const yearlyButton = document.querySelector('.yearly-button')
  const planDescriptions = document.querySelectorAll('.plan-desc')

  checkbox.addEventListener('change', function (e) {
    monthlyButton.classList.toggle('disabled', e.target.checked);
    yearlyButton.classList.toggle('enabled', e.target.checked)

    planDescriptions.forEach(planDescription => {
      const isYear = planDescription.classList.contains("year");
      const isMonth = planDescription.classList.contains("month");

      planDescription.classList.toggle('disabled', yearlyButton.classList.contains("enabled") ? isMonth : isYear);
    });

  });


  planSubcontainers.forEach(planSubcontainer => {
    planSubcontainer.addEventListener("click", (e) => {
      planSubcontainers.forEach(planSubcontainer => {
        if (planSubcontainer.classList.contains("active")) {
          planSubcontainer.classList.remove("active")
        }
      })
      planSubcontainer.classList.add("active")
    })
  })

  planForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const selectedPlanContainer = document.querySelector(".plan-subcontainer:is(.active)");
    const planError = document.querySelector('.plan-error')

    if (selectedPlanContainer) {

      planError.classList.add("disabled")
      let selectedPriceMonth = null;
      let selectedPriceYear = null;
      
      let containsYearDisabled;
      const planDescriptionYearAll = document.querySelectorAll(".plan-desc.year")


      planDescriptionYearAll.forEach(planDescriptionYear => {
        if (planDescriptionYear.classList.contains("disabled")){
          containsYearDisabled = true;
        }
        else {
          containsYearDisabled = false;
        }
      })
      
      
      if (containsYearDisabled) {
        selectedPriceMonth = selectedPlanContainer.getAttribute("price-month");
        
      }
      else {
        selectedPriceYear = selectedPlanContainer.getAttribute("price-year");
      }

      const planName = selectedPlanContainer.classList[0].charAt(0).toUpperCase() + selectedPlanContainer.classList[0].slice(1)

      const stepTwo = {
        name: planName,
        priceType: containsYearDisabled ? "Month" : "Year",
        priceMonth: selectedPriceMonth || null,
        priceYear: selectedPriceYear || null
      };

      stepsCount++
      updateStepCircles()
     


      multipleFormsResponses["planForm"] = stepTwo
     
      stepsContainers.forEach(stepContainer => {
        if (stepContainer.classList.contains("step2-container")) {
          stepContainer.classList.add("disabled")
        }

        if (stepContainer.classList.contains("step3-container")) {
          stepContainer.classList.remove("disabled")
        }


      })
      updateStepThree();

    } else {
      planError.classList.remove("disabled")

    }

  })

}
/* STEP 3 */
const backToStepTwoBtn = document.querySelector(".add-ons.back-btn");

backToStepTwoBtn.addEventListener("click", (e) => {
    
  stepsContainers.forEach((stepContainer) => {

    if (stepContainer.classList.contains("step2-container")) {
      stepContainer.classList.remove("disabled");

      stepsCount--
      updateStepCircles()
     
      multipleFormsResponses["planForm"] = {}
         }

    if (stepContainer.classList.contains("step3-container")) {
      stepContainer.classList.add("disabled");
      
    }
  });

   
});

const updateStepThree = () => {
  
  const step3Container = document.querySelector('.step3-container')
  const addOnsPriceAll = document.querySelectorAll(".addons-price")
  
  if(step3Container) {
    
    
    addOnsPriceAll.forEach(addOnsPrice => {
      if (multipleFormsResponses["planForm"].priceYear == null){
        if(addOnsPrice.classList.contains("yearly")){
          addOnsPrice.classList.add("disabled")
        }
        if(addOnsPrice.classList.contains("monthly")){
          addOnsPrice.classList.remove("disabled")
        }
      } 
      else {
        if(addOnsPrice.classList.contains("monthly")){
          addOnsPrice.classList.add("disabled")
        }
        if(addOnsPrice.classList.contains("yearly")){
          addOnsPrice.classList.remove("disabled")
        }
      }
    })
  }
}

const addOnsInputAll = document.querySelectorAll('.addons-input')

const addOnsSubcontainers = document.querySelectorAll('.addons-subcontainer')

console.log(addOnsSubcontainers)

addOnsInputAll.forEach(addOnsInput => {
  addOnsInput.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    const correspondingSubcontainer = findCorrespondingSubcontainer(e.target);

    if (correspondingSubcontainer) {
      if (isChecked) {
        correspondingSubcontainer.classList.add('active');
      } else {
        correspondingSubcontainer.classList.remove('active');
      }
    }
  });
});

function findCorrespondingSubcontainer(checkbox) {
  
  return checkbox.closest('.addons-subcontainer');
}

const addOnsForm = document.querySelector('.addons-form')

addOnsForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const checkedAddOns = {}
  const addonsInputs = document.querySelectorAll(".addons-input")

  let containsYearDisabled;

  const planDescriptionYearAll = document.querySelectorAll(".plan-desc.year")


  planDescriptionYearAll.forEach(planDescriptionYear => {
    if (planDescriptionYear.classList.contains("disabled")) {
      containsYearDisabled = true;
    }
    else {
      containsYearDisabled = false;
    }
  })

  addonsInputs.forEach((checkbox) => {
    if (checkbox.checked) {
      const container = checkbox.closest(".addons-subcontainer");
      const addonName = container.querySelector(".addons-desc p:first-child").innerText;
      const addonType = container.classList[1]; 

      const addon = {
        name: addonName.replace(/\s+/g, ''),
        addOnsName : addonName,
        type: addonType,
        priceMonth: containsYearDisabled ? container.getAttribute("price-month") : null,
        priceYear: containsYearDisabled ? null : container.getAttribute("price-year") ,
      };
      
      checkedAddOns[`${addon.name}`] = addon;

      // if (addon.priceYear == null || isNaN(addon.priceYear)) {
      //   addon.priceYear = 0;
      // }
      // if (addon.priceMonth == null || isNaN(addon.priceMonth)) {
      //   addon.priceMonth = 0;
      // }
  
    }

  });



  stepsCount++
  updateStepCircles()
 


  multipleFormsResponses["addOnsForm"] = checkedAddOns
 
  stepsContainers.forEach(stepContainer => {
    if (stepContainer.classList.contains("step3-container")) {
      stepContainer.classList.add("disabled")
    }

    if (stepContainer.classList.contains("step4-container")) {
      stepContainer.classList.remove("disabled")
    }
  })

  

  updateStepFour()
})


/* STEP 4 */
const backToStepThreeBtn = document.querySelector('.summary.back-btn')

const planSummaryContainer = document.querySelector('.plan-summary-container')
const addOnsSummaryContainer = document.querySelector('.addons-summary-container')
const totalSummaryContainer = document.querySelector(".total-summary-container")


backToStepThreeBtn.addEventListener("click", (e) => {
  
  stepsContainers.forEach((stepContainer) => {

    if (stepContainer.classList.contains("step3-container")) {
      stepContainer.classList.remove("disabled");

      stepsCount--
      updateStepCircles()
     
      multipleFormsResponses["addOnsForm"] = {}
         }

    if (stepContainer.classList.contains("step4-container")) {
      stepContainer.classList.add("disabled");
      
    }
  });
  
  planSummaryContainer.innerHTML = ''
  addOnsSummaryContainer.innerHTML = ''
  totalSummaryContainer.innerHTML = ''
  
})



const updateStepFour = () => {
  
  
  let containsYearDisabled;
  const planDescriptionYearAll = document.querySelectorAll(".plan-desc.year")


  planDescriptionYearAll.forEach(planDescriptionYear => {
    if (planDescriptionYear.classList.contains("disabled")){
      containsYearDisabled = true;
    }
    else {
      containsYearDisabled = false;
    }
  })
  


  /* Summary Container */
  //creating plan summary container (1)
  const planSummaryContainer = document.querySelector('.plan-summary-container')

  //creating change price container (2)
  const changePriceContainer = document.createElement("div")
  changePriceContainer.classList.add("change-price-container")

  //creating a change plan price subcontainer (3)
  const changePlanPriceSubcontainer = document.createElement("div")
  changePlanPriceSubcontainer.classList.add("change-plan-price-subcontainer")

  const planText = document.createElement("p")
  const changeBtn = document.createElement("button")
  changeBtn.type = "button"
  changeBtn.classList.add("change-btn","change-monthly-price")
  
  planText.textContent = `${multipleFormsResponses["planForm"].name} (${multipleFormsResponses["planForm"].priceType}ly)`
  changeBtn.textContent = `Change`

  changePlanPriceSubcontainer.appendChild(planText)
  changePlanPriceSubcontainer.appendChild(changeBtn)
  changePriceContainer.appendChild(changePlanPriceSubcontainer)
  planSummaryContainer.appendChild(changePriceContainer)
  

  //Creating change price plan desc div
  const changeMonthPricePlanDesc = document.createElement("div")
  changeMonthPricePlanDesc.classList.add("change-price-plan-desc","monthly")
  changeMonthPricePlanDesc.textContent = `+$${multipleFormsResponses["planForm"].priceMonth}/mo`
  planSummaryContainer.appendChild(changeMonthPricePlanDesc)
  
  const changeYearPricePlanDesc = document.createElement("div")
  changeYearPricePlanDesc.classList.add("change-price-plan-desc","yearly")
  changeYearPricePlanDesc.textContent = `+$${multipleFormsResponses["planForm"].priceYear}/yr`
  planSummaryContainer.appendChild(changeYearPricePlanDesc)
  
  /* addOns Price Subcontainer */

  const addOnsSummaryContainer = document.querySelector('.addons-summary-container')
  const addOnsArray = Object.values(multipleFormsResponses["addOnsForm"])

  let totalAddOnsMonth = 0
  let totalAddOnsYear = 0
  addOnsArray.forEach((addOns) => {
    const addOnsPriceContainer = document.createElement("div")
    addOnsPriceContainer.classList.add("addons-price-container")

    const addOnsPriceSubcontainer = document.createElement("div")
    addOnsPriceSubcontainer.classList.add
    ("addons-price-subcontainer")
    addOnsPriceSubcontainer.textContent = `${addOns.addOnsName}`

    const changePriceMonthAddOnsDesc = document.createElement("div")
    changePriceMonthAddOnsDesc.classList.add("change-price-addons-desc","monthly")

    const changePriceYearAddOnsDesc = document.createElement("div")
    changePriceYearAddOnsDesc.classList.add("change-price-addons-desc","yearly")

    changePriceMonthAddOnsDesc.textContent = `+$${addOns.priceMonth}/mo`
    changePriceYearAddOnsDesc.textContent = `+$${addOns.priceYear}/yr`


    totalAddOnsMonth += parseInt(addOns.priceMonth)

    totalAddOnsYear += parseInt(addOns.priceYear)



    if (containsYearDisabled){
      changePriceMonthAddOnsDesc.classList.remove("disabled")
      changePriceYearAddOnsDesc.classList.add("disabled")
    } else {
      changePriceMonthAddOnsDesc.classList.add("disabled")
      changePriceYearAddOnsDesc.classList.remove("disabled") 
    }
  

    addOnsPriceContainer.appendChild(addOnsPriceSubcontainer)
    addOnsPriceContainer.appendChild(changePriceMonthAddOnsDesc)
    addOnsPriceContainer.appendChild(changePriceYearAddOnsDesc)
    addOnsSummaryContainer.appendChild(addOnsPriceContainer)

  })

   /* Total Summary Container */
  const totalSummaryContainer = document.querySelector(".total-summary-container")
  let totalMonth = parseInt(multipleFormsResponses["planForm"].priceMonth) + parseInt(totalAddOnsMonth)
  let totalYear = parseInt(multipleFormsResponses["planForm"].priceYear) + parseInt(totalAddOnsYear)

  console.log(totalMonth)
  console.log(totalYear)
  
  const totalText = document.createElement("div")
  totalText.classList.add("total-text")
  totalText.textContent = `Total (per ${multipleFormsResponses["planForm"].priceType})`

  const totalPriceMonth = document.createElement("div")
  totalPriceMonth.classList.add("total-price")
  totalPriceMonth.textContent = `+$${totalMonth}/mo`

  const totalPriceYear = document.createElement("div")
  totalPriceYear.classList.add("total-price")
  totalPriceYear.textContent = `+$${totalYear}/yr`

  totalSummaryContainer.appendChild(totalText)
  totalSummaryContainer.appendChild(totalPriceMonth)
  totalSummaryContainer.appendChild(totalPriceYear)

  if (containsYearDisabled){
    totalPriceMonth.classList.remove("disabled")
    totalPriceYear.classList.add("disabled")
  } else {
    totalPriceMonth.classList.add("disabled")
    totalPriceYear.classList.remove("disabled") 
  }
 
  if (containsYearDisabled) {
    if (changeYearPricePlanDesc.classList.contains("yearly")) {
      changeYearPricePlanDesc.classList.add("disabled")
    }
    if (changeMonthPricePlanDesc.classList.contains("monthly")) {
      changeMonthPricePlanDesc.classList.remove("disabled")
    }
  } else {
    if (changeMonthPricePlanDesc.classList.contains("monthly")) {
      changeMonthPricePlanDesc.classList.add("disabled")
    }
    if (changeYearPricePlanDesc.classList.contains("yearly")) {
      changeYearPricePlanDesc.classList.remove("disabled")
    }
  }
  

  if (changeBtn) {
    changeBtn.addEventListener("click", (e) => {
      
      stepsContainers.forEach((stepContainer) => {

        if (stepContainer.classList.contains("step2-container")) {
          stepContainer.classList.remove("disabled");
    
          stepsCount = stepsCount - 2
          updateStepCircles()
             
          multipleFormsResponses["addOnsForm"] = {}
          multipleFormsResponses["planForm"] = {}
        }
    
        if (stepContainer.classList.contains("step4-container")) {
          stepContainer.classList.add("disabled");
          
        }
      });

      planSummaryContainer.innerHTML = ''
      addOnsSummaryContainer.innerHTML = ''
      totalSummaryContainer.innerHTML = ''
    })
  }
}


const summaryForm = document.querySelector('.summary-form')

summaryForm.addEventListener("submit", (e) => {
  e.preventDefault()
  stepsContainers.forEach((stepContainer) => {

    if (stepContainer.classList.contains("step5-container")) {
      stepContainer.classList.remove("disabled");

    }

    if (stepContainer.classList.contains("step4-container")) {
      stepContainer.classList.add("disabled");
      
    }
  });

  localStorage.setItem('responses', JSON.stringify(multipleFormsResponses))
})

