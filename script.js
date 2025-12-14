function openModal(id){document.getElementById('modalOverlay').classList.remove('hidden');document.getElementById(id).classList.remove('hidden')}
function closeModal(){document.getElementById('modalOverlay').classList.add('hidden');document.querySelectorAll('.modal').forEach(m=>m.classList.add('hidden'))}

function acceptBooking(id){const el=document.getElementById(id);el.style.opacity=0.6;el.querySelector('.event-actions').innerHTML='<span class="tag accepted">Accepted ✓</span>';alert('Booking accepted: '+id)}
function rejectBooking(id){const el=document.getElementById(id);el.style.opacity=0.6;el.querySelector('.event-actions').innerHTML='<span class="tag rejected">Rejected</span>';alert('Booking rejected: '+id)}

function sendThankYou(){const text=document.getElementById('thankText').value;closeModal();alert('Thank-you sent:\n\n'+text)}

function generateAIPost(){const ai= document.getElementById('aiPostText');ai.value = `Hey y'all — I'm hitting ${document.getElementById('tourStops').value.split(' — ')[1] || 'a city near you'} on Jun 12! New merch and surprises. Come hang 🤠 #NewSingle`;}
function approvePost(){const p=document.getElementById('aiPostText').value;closeModal();alert('Post scheduled:\n\n'+p)}

function createGig(){const t=document.getElementById('gigTitle').value;const d=document.getElementById('gigDate').value;closeModal();alert('Gig created: '+t+' '+d)}
function confirmShip(){const stop=document.getElementById('tourStops').value;const addr=document.getElementById('shipAddress').value;closeModal();alert('Ship confirmed to '+stop+'\nAddress: '+addr)}

// small UX helpers (no backend) -- keep state minimal
document.addEventListener('keydown', (e)=>{if(e.key==='Escape')closeModal()});

// Tab functionality
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const tabId = btn.dataset.tab;
    const content = document.getElementById(tabId);
    if (content) content.classList.add('active');
  });
});

// Chart
document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('streamsChart');
  if (ctx) {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          label: 'Total Streams',
          data: [1200000, 1500000, 1800000, 2000000],
          borderColor: 'rgba(255, 154, 158, 1)',
          backgroundColor: 'rgba(255, 154, 158, 0.2)',
        }, {
          label: 'Spotify',
          data: [800000, 1000000, 1200000, 1400000],
          borderColor: '#1DB954',
          backgroundColor: 'rgba(29, 185, 84, 0.2)',
        }, {
          label: 'Apple Music',
          data: [300000, 400000, 500000, 500000],
          borderColor: '#FC3C44',
          backgroundColor: 'rgba(252, 60, 68, 0.2)',
        }, {
          label: 'YouTube',
          data: [100000, 100000, 100000, 100000],
          borderColor: '#FF0000',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
        }
      }
    });
  }

  const merchCtx = document.getElementById('merchChart');
  if (merchCtx) {
    new Chart(merchCtx, {
      type: 'bar',
      data: {
        labels: ['T-Shirts', 'Hats', 'Posters', 'CDs'],
        datasets: [{
          label: 'Units Sold',
          data: [150, 80, 60, 50],
          backgroundColor: ['#667eea', '#764ba2', '#f093fb', '#f5576c'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
        }
      }
    });
  }

  const financesCtx = document.getElementById('financesChart');
  if (financesCtx) {
    new Chart(financesCtx, {
      type: 'doughnut',
      data: {
        labels: ['Donations', 'Streams', 'Merch', 'Other'],
        datasets: [{
          data: [2060, 1250, 5120, 1000],
          backgroundColor: ['#ff9a9e', '#fecfef', '#667eea', '#764ba2'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
        }
      }
    });
  }

  const pastGigsCtx = document.getElementById('pastGigsChart');
  if (pastGigsCtx) {
    new Chart(pastGigsCtx, {
      type: 'line',
      data: {
        labels: ['Apr 20', 'May 15'],
        datasets: [{
          label: 'Attendance',
          data: [200, 300],
          borderColor: '#56ab2f',
          backgroundColor: 'rgba(86, 171, 47, 0.2)',
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
        }
      }
    });
  }

  const topSellingCtx = document.getElementById('topSellingChart');
  if (topSellingCtx) {
    new Chart(topSellingCtx, {
      type: 'bar',
      data: {
        labels: ['T-Shirt', 'Hat', 'CD'],
        datasets: [{
          label: 'Units Sold',
          data: [120, 80, 50],
          backgroundColor: ['#ff9a9e', '#fecfef', '#667eea'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
        }
      }
    });
  }

  const expenseCtx = document.getElementById('expenseChart');
  if (expenseCtx) {
    new Chart(expenseCtx, {
      type: 'pie',
      data: {
        labels: ['Venue Fees', 'Marketing', 'Equipment'],
        datasets: [{
          data: [1200, 800, 500],
          backgroundColor: ['#ff6b6b', '#ffa726', '#56ab2f'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
        }
      }
    });
  }
});

// AI Assistant Functionality
document.addEventListener('DOMContentLoaded', () => {
  const aiButton = document.getElementById('aiButton');
  const aiChat = document.getElementById('aiChat');
  const closeChat = document.getElementById('closeChat');
  const chatInput = document.getElementById('chatInput');
  const sendChat = document.getElementById('sendChat');
  const chatMessages = document.getElementById('chatMessages');

  aiButton.addEventListener('click', () => {
    aiChat.classList.toggle('hidden');
  });

  closeChat.addEventListener('click', () => {
    aiChat.classList.add('closing');
    setTimeout(() => {
      aiChat.classList.remove('closing');
      aiChat.classList.add('hidden');
    }, 300);
  });

  sendChat.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
      addMessage('user', message);
      chatInput.value = '';
      setTimeout(() => {
        const response = getAIResponse(message);
        addMessage('ai', response);
      }, 500);
    }
  });

  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendChat.click();
    }
  });

  function addMessage(type, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function getAIResponse(input) {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('gig') || lowerInput.includes('gigs')) {
      return "For gigs, I can help schedule new events, analyze past performance data, or suggest venues. What would you like to do?";
    } else if (lowerInput.includes('merch') || lowerInput.includes('merchandise')) {
      return "On merch, I can assist with inventory management, sales analytics, or shipping logistics. How can I help?";
    } else if (lowerInput.includes('finance') || lowerInput.includes('finances')) {
      return "For finances, I can provide expense tracking, revenue projections, or budget advice. What do you need?";
    } else if (lowerInput.includes('social') || lowerInput.includes('post')) {
      return "I can generate AI-powered social media posts, analyze engagement, or schedule content. Let me know!";
    } else {
      return "I'm here to help with gigs, merch, finances, and social media. Ask me anything related to those!";
    }
  }
});