function handleSplitSending() {
  console.log('Initializing split sending...');
  
  const immediateCheckbox = document.getElementById('splitSendSwitch');
  const immediateOptions = document.getElementById('immediateSplitOptions');
  
  console.log('Immediate elements:', { immediateCheckbox, immediateOptions });
  
  if (immediateCheckbox && immediateOptions) {
    immediateCheckbox.addEventListener('change', function() {
      if (this.checked) {
        immediateOptions.classList.remove('d-none');
      } else {
        immediateOptions.classList.add('d-none');
      }
    });
  }

  const reserveCheckbox = document.getElementById('reserveSplitSendSwitch');
  const reserveOptions = document.getElementById('reserveSplitOptions');
  
  console.log('Reserve elements:', { reserveCheckbox, reserveOptions });
  
  if (reserveCheckbox && reserveOptions) {
    reserveCheckbox.addEventListener('change', function() {
      if (this.checked) {
        reserveOptions.classList.remove('d-none');
      } else {
        reserveOptions.classList.add('d-none');
      }
    });
  }
}


const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
      const immediateCheckbox = document.getElementById('splitSendSwitch');
      const reserveCheckbox = document.getElementById('reserveSplitSendSwitch');
      
      if (immediateCheckbox || reserveCheckbox) {
        handleSplitSending();
        break;
      }
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

handleSplitSending();

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded');
  handleSplitSending();
});

const tabEls = document.querySelectorAll('button[data-bs-toggle="pill"]');
tabEls.forEach(tabEl => {
  tabEl.addEventListener('shown.bs.tab', handleSplitSending);
});

window.addEventListener('load', () => {
  console.log('Window loaded');
  handleSplitSending();
});

setInterval(() => {
  console.log('Checking for elements...');
  handleSplitSending();
}, 1000);
 
 



