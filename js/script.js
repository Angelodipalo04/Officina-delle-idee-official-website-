document.addEventListener('DOMContentLoaded', function () {
  // Anno corrente nel footer
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Menu di navigazione mobile
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Metodo di pagamento (form iscrizione)
  var tesseraSelect = document.getElementById('tessera');
  var metodoPagamentoRadios = document.querySelectorAll('input[name="metodo_pagamento"]');
  var dettagliBonifico = document.getElementById('dettagli-bonifico');
  var dettagliCarta = document.getElementById('dettagli-carta');
  var causaleSuggerita = document.getElementById('causale-suggerita');
  var linkPagamentoCarta = document.getElementById('link-pagamento-carta');
  var cartaMessaggio = document.getElementById('carta-messaggio');

  if (tesseraSelect && metodoPagamentoRadios.length && dettagliBonifico && dettagliCarta) {
    var linkPerTessera = {
      'Junior - 20 euro': '#LINK-PAGAMENTO-JUNIOR',
      'Senior - 50 euro': '#LINK-PAGAMENTO-SENIOR',
      'Partner - 100 euro': '#LINK-PAGAMENTO-PARTNER'
    };

    var nomeTessera = function (valoreTessera) {
      return valoreTessera ? valoreTessera.split(' - ')[0] : '';
    };

    var aggiornaMetodoPagamento = function () {
      var metodo = document.querySelector('input[name="metodo_pagamento"]:checked');
      dettagliBonifico.classList.toggle('active', !!metodo && metodo.value === 'Bonifico bancario');
      dettagliCarta.classList.toggle('active', !!metodo && metodo.value === 'Pagamento con carta');
    };

    var aggiornaDettagliTessera = function () {
      var tipo = nomeTessera(tesseraSelect.value);

      if (causaleSuggerita) {
        causaleSuggerita.textContent = tipo
          ? 'Tessera ' + tipo + ' - Nome Cognome'
          : 'Seleziona una tessera per generare la causale';
      }

      if (linkPagamentoCarta && cartaMessaggio) {
        if (tipo && linkPerTessera[tesseraSelect.value]) {
          linkPagamentoCarta.href = linkPerTessera[tesseraSelect.value];
          linkPagamentoCarta.style.display = 'inline-flex';
          cartaMessaggio.style.display = 'none';
        } else {
          linkPagamentoCarta.style.display = 'none';
          cartaMessaggio.style.display = 'block';
        }
      }
    };

    metodoPagamentoRadios.forEach(function (radio) {
      radio.addEventListener('change', aggiornaMetodoPagamento);
    });
    tesseraSelect.addEventListener('change', aggiornaDettagliTessera);

    aggiornaMetodoPagamento();
    aggiornaDettagliTessera();
  }

  // Modale iscrizione evento (pagina eventi)
  var eventModal = document.getElementById('eventModal');
  var eventoForm = document.getElementById('eventoForm');

  if (eventModal && eventoForm) {
    var eventModalTitle = document.getElementById('eventModalTitle');
    var eventoInput = document.getElementById('eventoInput');
    var eventModalFormView = document.getElementById('eventModalForm');
    var eventModalSuccessView = document.getElementById('eventModalSuccess');
    var eventModalDownload = document.getElementById('eventModalDownload');
    var eventoSubmitBtn = eventoForm.querySelector('button[type="submit"]');
    var eventoSubmitLabel = eventoSubmitBtn ? eventoSubmitBtn.textContent : '';
    var currentLocandina = '';

    var openEventModal = function (card) {
      var titolo = card.getAttribute('data-event-title') || '';
      currentLocandina = card.getAttribute('data-locandina') || '#';

      eventoForm.reset();
      eventModalFormView.style.display = 'block';
      eventModalSuccessView.style.display = 'none';

      if (eventModalTitle) { eventModalTitle.textContent = titolo; }
      if (eventoInput) { eventoInput.value = titolo; }

      eventModal.classList.add('active');
      eventModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    };

    var closeEventModal = function () {
      eventModal.classList.remove('active');
      eventModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    };

    document.querySelectorAll('.event-card').forEach(function (card) {
      var partecipaBtn = card.querySelector('.event-action .btn');
      if (partecipaBtn) {
        partecipaBtn.addEventListener('click', function (e) {
          e.preventDefault();
          openEventModal(card);
        });
      }
    });

    eventModal.querySelectorAll('[data-modal-close]').forEach(function (btn) {
      btn.addEventListener('click', closeEventModal);
    });

    eventModal.addEventListener('click', function (e) {
      if (e.target === eventModal) { closeEventModal(); }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && eventModal.classList.contains('active')) {
        closeEventModal();
      }
    });

    eventoForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var datiForm = new URLSearchParams(new FormData(eventoForm)).toString();

      if (eventoSubmitBtn) {
        eventoSubmitBtn.disabled = true;
        eventoSubmitBtn.textContent = 'Invio in corso...';
      }

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: datiForm
      })
        .then(function () {
          eventModalFormView.style.display = 'none';
          eventModalSuccessView.style.display = 'block';
          if (eventModalDownload) {
            eventModalDownload.setAttribute('href', currentLocandina);
          }
        })
        .catch(function () {
          alert('Si è verificato un errore nell\'invio. Riprova più tardi.');
        })
        .finally(function () {
          if (eventoSubmitBtn) {
            eventoSubmitBtn.disabled = false;
            eventoSubmitBtn.textContent = eventoSubmitLabel;
          }
        });
    });
  }
});
