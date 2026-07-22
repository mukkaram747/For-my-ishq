document.addEventListener('DOMContentLoaded', () => {
  const envelopeStep = document.getElementById('envelope-step');
  const letterStep = document.getElementById('letter-step');
  const questionStep = document.getElementById('question-step');
  const successStep = document.getElementById('success-step');

  const envelopeBtn = document.getElementById('envelope-btn');
  const nextToQuestionBtn = document.getElementById('next-to-question');
  const yesBtn = document.getElementById('yes-btn');
  const noBtn = document.getElementById('no-btn');
  const attemptHint = document.getElementById('attempt-hint');

  let noAttempts = 0;
  const hintMessages = [
    "pretty please?",
    "think about it...",
    "are you sure?",
    "you can't click no! 😉"
  ];

  function switchCard(from, to) {
    from.classList.remove('active');
    from.classList.add('hidden');
    setTimeout(() => {
      to.classList.remove('hidden');
      to.classList.add('active');
    }, 200);
  }

  envelopeBtn.addEventListener('click', () => switchCard(envelopeStep, letterStep));
  nextToQuestionBtn.addEventListener('click', () => switchCard(letterStep, questionStep));

  function moveNoButton() {
    noAttempts++;
    const msgIndex = Math.min(noAttempts - 1, hintMessages.length - 1);
    attemptHint.innerText = hintMessages[msgIndex];

    const x = (Math.random() - 0.5) * 180;
    const y = (Math.random() - 0.5) * 120;

    noBtn.style.transform = `translate(${x}px, ${y}px)`;
  }

  noBtn.addEventListener('mouseover', moveNoButton);
  noBtn.addEventListener('click', moveNoButton);

  function showAppNotification(msg) {
    const toast = document.createElement('div');
    toast.innerHTML = `<span style="font-size: 18px; margin-right: 8px;">✔</span> ${msg}`;
    
    toast.style.cssText = `
      position: fixed !important;
      top: 20px !important;
      left: 50% !important;
      transform: translateX(-50%) !important;
      background-color: #28a745 !important;
      color: #ffffff !important;
      padding: 12px 26px !important;
      border-radius: 30px !important;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3) !important;
      font-size: 16px !important;
      font-weight: 600 !important;
      font-family: sans-serif !important;
      z-index: 9999999 !important;
      opacity: 1 !important;
      transition: all 0.4s ease !important;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.top = '0px';
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }

  yesBtn.addEventListener('click', () => {
    showAppNotification("Response Submitted!");
    switchCard(questionStep, successStep);

    const formspreeID = "xlgqwnaa"; 

    fetch(`https://formspree.io/f/${formspreeID}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        status: 'ACCEPTED! ❤️',
        message: 'Laiba Naz clicked YES on your love letter!',
        time: new Date().toLocaleString()
      })
    }).catch(err => console.log(err));
  });
});
