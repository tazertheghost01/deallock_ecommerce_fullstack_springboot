let currentStep = 1;
const totalSteps = 6;

const steps = {
  1: { num: "01", title: "Find a Deal", desc: "You find a product anywhere online, on social media, through a friend or in a physical store. Deallock.ng, create an account or sign in, and tap Lock a Deal to begin securing the item." },
  2: { num: "02", title: "Pay to Lock", desc: "Pay 50% commitment deposit plus any apllicable charges to Deallock.ng to confirm your serious interest in the item and lock the transaction." },
  3: { num: "03", title: "We Secure the Item", desc: "Deallock.ng secures the item on your behalf, ensuring it is reserved while the transaction continues under the agreed terms until completion." },
  4: { num: "04", title: "Complete Your Payment", desc: "Pay the remaining balance securely." },
  5: { num: "05", title: "Pickup or Delivery", desc: "Choose how you want to receive your item." },
  6: { num: "06", title: "What If You Can't Complete?", desc: "You can get a refund if you change your mind (terms apply)." }
};

function showStep(step) {
  currentStep = step;
  
  document.getElementById('phone-step-number').textContent = steps[step].num;
  document.getElementById('phone-step-title').textContent = steps[step].title;
  document.getElementById('phone-step-desc').textContent = steps[step].desc;

  // Highlight active step on desktop
  for (let i = 1; i <= totalSteps; i++) {
    const card = document.getElementById(`step-${i}`);
    if (card) {
      card.classList.toggle('ring-2', i === step);
      card.classList.toggle('ring-emerald-500', i === step);
    }
  }

  updateDots();
}

function updateDots() {
  const dotsContainer = document.getElementById('step-dots');
  dotsContainer.innerHTML = '';
  
  for (let i = 1; i <= totalSteps; i++) {
    const dot = document.createElement('button');
    dot.className = `w-3 h-3 rounded-full transition-all ${i === currentStep ? 'bg-emerald-500 scale-125' : 'bg-white/30'}`;
    dot.onclick = () => showStep(i);
    dotsContainer.appendChild(dot);
  }
}

function nextStep() {
  showStep(currentStep === totalSteps ? 1 : currentStep + 1);
}

function prevStep() {
  showStep(currentStep === 1 ? totalSteps : currentStep - 1);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  showStep(1);
});
