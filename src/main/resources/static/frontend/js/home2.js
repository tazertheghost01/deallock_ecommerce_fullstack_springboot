let currentStep = 1;
const totalSteps = 6;

const steps = {
  1: { num: "01", title: "Find a Deal", desc: "Browse our marketplace and find the item you want." },
  2: { num: "02", title: "Pay to Lock", desc: "Make a small deposit to secure the deal." },
  3: { num: "03", title: "We Secure the Item", desc: "We hold the item safely until payment is complete." },
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
