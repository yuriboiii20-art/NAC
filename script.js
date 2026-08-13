/* ==========================================================================
   NATIONAL CA ACADEMY (NCA) - INTERACTIVE INTERFACE LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation Header Effect
  const header = document.querySelector('.header-main');
  const backToTopBtn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      backToTopBtn?.classList.add('active');
    } else {
      backToTopBtn?.classList.remove('active');
    }
  });

  // Back to Top Scroll Action
  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // 2. Mobile Drawer Navigation Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerClose = document.querySelector('.drawer-close');
  const drawerBackdrop = document.querySelector('.drawer-backdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileDrawer() {
    mobileDrawer?.classList.add('active');
    drawerBackdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer() {
    mobileDrawer?.classList.remove('active');
    drawerBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', openMobileDrawer);
  drawerClose?.addEventListener('click', closeMobileDrawer);
  drawerBackdrop?.addEventListener('click', closeMobileDrawer);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileDrawer);
  });

  // 3. Program Tab Filtering
  const tabBtns = document.querySelectorAll('.tab-btn');
  const programCards = document.querySelectorAll('.program-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      programCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 4. Interactive FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const faqItem = q.parentElement;
      const isActive = faqItem.classList.contains('active');

      // Close all active FAQs
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      // Toggle clicked item
      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });

  // 5. Modal Popup Logic (Brochure / Admission Enquiry)
  const modalOverlay = document.getElementById('enquiryModal');
  const modalCloseBtns = document.querySelectorAll('.modal-close, .modal-cancel');
  const triggerModalBtns = document.querySelectorAll('.trigger-modal');

  triggerModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modalOverlay?.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modalOverlay?.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // 6. Form Submission & Toast Notification
  const leadForms = document.querySelectorAll('form');
  const toastMsg = document.getElementById('toastMsg');

  function showToast(message) {
    if (toastMsg) {
      toastMsg.querySelector('.toast-text').textContent = message;
      toastMsg.classList.add('show');
      setTimeout(() => {
        toastMsg.classList.remove('show');
      }, 4000);
    }
  }

  leadForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

      if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }

        form.reset();
        modalOverlay?.classList.remove('active');
        document.body.style.overflow = '';

        showToast('Thank you! Your enquiry has been received. Our counselor will contact you shortly.');
      }, 1200);
    });
  });

  // 7. Animated Statistics Counter
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  function animateStats() {
    statNumbers.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      const prefix = stat.getAttribute('data-prefix') || '';
      const suffix = stat.getAttribute('data-suffix') || '';
      let count = 0;
      const speed = target / 50;

      const updateCount = () => {
        count += speed;
        if (count < target) {
          stat.innerText = prefix + Math.ceil(count) + suffix;
          setTimeout(updateCount, 25);
        } else {
          stat.innerText = prefix + target + suffix;
        }
      };

      updateCount();
    });
  }

  const statsSection = document.querySelector('.stats-bar');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated) {
        animated = true;
        animateStats();
      }
    }, { threshold: 0.5 });

    observer.observe(statsSection);
  }

  // 8. GSAP ScrollTrigger Vertical Stacking Glass Cards Animation
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Stacking Glass Cards for Integrated & Professional Programs
    function initProgramsGSAPStacking() {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars && st.vars.id === 'programStackingTrigger') {
          st.kill();
        }
      });

      const visibleProgramCards = Array.from(document.querySelectorAll('.program-card')).filter(card => {
        return window.getComputedStyle(card).display !== 'none';
      });

      visibleProgramCards.forEach((card, index) => {
        if (index < visibleProgramCards.length - 1) {
          gsap.to(card, {
            scale: 1 - (visibleProgramCards.length - index) * 0.035,
            opacity: 0.82,
            filter: 'blur(2px)',
            transformOrigin: 'top center',
            ease: 'none',
            scrollTrigger: {
              id: 'programStackingTrigger',
              trigger: visibleProgramCards[index + 1],
              start: 'top 75%',
              end: 'top 20%',
              scrub: true
            }
          });
        }
      });
    }

    initProgramsGSAPStacking();

    // Re-initialize GSAP program stacking whenever filter tabs are clicked
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        setTimeout(() => {
          initProgramsGSAPStacking();
          ScrollTrigger.refresh();
        }, 220);
      });
    });

    // Stacking Glass Cards for Core Pillars
    const stackingCards = gsap.utils.toArray('.stacking-card-item');
    stackingCards.forEach((card, index) => {
      if (index < stackingCards.length - 1) {
        gsap.to(card.querySelector('.glass-card-inner'), {
          scale: 1 - (stackingCards.length - index) * 0.035,
          opacity: 0.75,
          filter: 'blur(3px)',
          transformOrigin: 'top center',
          ease: 'none',
          scrollTrigger: {
            trigger: stackingCards[index + 1],
            start: 'top 75%',
            end: 'top 20%',
            scrub: true
          }
        });
      }
    });
  }

  // 9. Interactive 37-Image Hero Photo Booth Logic
  const heroPhotoBooth = document.getElementById('heroPhotoBooth');
  const boothImg = document.getElementById('boothImg');
  const boothName = document.getElementById('boothName');
  const boothCounter = document.getElementById('boothCounter');

  if (heroPhotoBooth && boothImg) {
    const boothData = [
      { name: 'MANJUNATH', img: 'assets/chairman_ram.jpg' },
      { name: 'PRIYA M', img: 'assets/modern_classroom.jpg' },
      { name: 'RAHUL KUMAR', img: 'assets/hero_campus.jpg' },
      { name: 'DIVYA SHREE', img: 'assets/logo.jpg' },
      { name: 'PRAJWALL G', img: 'assets/chairman_ram.jpg' },
      { name: 'KARTHIK N', img: 'assets/modern_classroom.jpg' },
      { name: 'HARSHITHA V', img: 'assets/hero_campus.jpg' },
      { name: 'SNEHA R', img: 'assets/logo.jpg' },
      { name: 'MANJUNATH', img: 'assets/chairman_ram.jpg' },
      { name: 'ROHAN SHARMA', img: 'assets/modern_classroom.jpg' },
      { name: 'VIKASH SINGH', img: 'assets/hero_campus.jpg' },
      { name: 'KAVYA NAIR', img: 'assets/logo.jpg' },
      { name: 'ANANYA B', img: 'assets/chairman_ram.jpg' },
      { name: 'ABHISHEK K', img: 'assets/modern_classroom.jpg' },
      { name: 'VARUN GOWDA', img: 'assets/hero_campus.jpg' },
      { name: 'MONIKA SHREE', img: 'assets/logo.jpg' },
      { name: 'NITHIN KUMAR', img: 'assets/chairman_ram.jpg' },
      { name: 'SHWETA M', img: 'assets/modern_classroom.jpg' },
      { name: 'GIRISH R', img: 'assets/hero_campus.jpg' },
      { name: 'DEEPAK S', img: 'assets/logo.jpg' },
      { name: 'POOJA L', img: 'assets/chairman_ram.jpg' },
      { name: 'ARJUN REDDY', img: 'assets/modern_classroom.jpg' },
      { name: 'TEJASWINI B', img: 'assets/hero_campus.jpg' },
      { name: 'SACHIN H', img: 'assets/logo.jpg' },
      { name: 'BHAVANA P', img: 'assets/chairman_ram.jpg' },
      { name: 'YASHWANTH K', img: 'assets/modern_classroom.jpg' },
      { name: 'MADHURI V', img: 'assets/hero_campus.jpg' },
      { name: 'VISHNU DAS', img: 'assets/logo.jpg' },
      { name: 'CHETAN M', img: 'assets/chairman_ram.jpg' },
      { name: 'SONAL AGARWAL', img: 'assets/modern_classroom.jpg' },
      { name: 'KISHORE G', img: 'assets/hero_campus.jpg' },
      { name: 'MEGHANA R', img: 'assets/logo.jpg' },
      { name: 'PAVAN KUMAR', img: 'assets/chairman_ram.jpg' },
      { name: 'SUSHMA N', img: 'assets/modern_classroom.jpg' },
      { name: 'HEMANTH B', img: 'assets/hero_campus.jpg' },
      { name: 'SWATI SHARMA', img: 'assets/logo.jpg' },
      { name: 'MANJUNATH', img: 'assets/chairman_ram.jpg' }
    ];

    let currentBoothIndex = 8; // Index 8 is 9/37

    function updateBooth(index) {
      const item = boothData[index];
      boothImg.src = item.img;
      if (boothName) boothName.textContent = item.name;
      if (boothCounter) boothCounter.textContent = `${index + 1}/37`;
    }

    const boothPrevBtn = document.getElementById('boothPrevBtn');
    const boothNextBtn = document.getElementById('boothNextBtn');
    const boothImgContainer = document.getElementById('boothImgContainer');

    if (boothPrevBtn) {
      boothPrevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentBoothIndex = (currentBoothIndex - 1 + boothData.length) % boothData.length;
        updateBooth(currentBoothIndex);
      });
    }

    if (boothNextBtn) {
      boothNextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentBoothIndex = (currentBoothIndex + 1) % boothData.length;
        updateBooth(currentBoothIndex);
      });
    }

    // Lightbox Modal References
    const photoLightbox = document.getElementById('photoLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxName = document.getElementById('lightboxName');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
    const lightboxNextBtn = document.getElementById('lightboxNextBtn');
    const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
    const lightboxBackdrop = document.getElementById('lightboxBackdrop');

    function updateLightbox(index) {
      const item = boothData[index];
      if (lightboxImg) lightboxImg.src = item.img;
      if (lightboxName) lightboxName.textContent = item.name;
      if (lightboxCounter) lightboxCounter.textContent = `${index + 1}/37`;
    }

    function openLightbox(index) {
      currentBoothIndex = index;
      updateLightbox(currentBoothIndex);
      if (photoLightbox) photoLightbox.classList.add('active');
    }

    function closeLightbox() {
      if (photoLightbox) photoLightbox.classList.remove('active');
    }

    if (boothImgContainer) {
      boothImgContainer.addEventListener('click', () => {
        openLightbox(currentBoothIndex);
      });
    }

    if (lightboxPrevBtn) {
      lightboxPrevBtn.addEventListener('click', () => {
        currentBoothIndex = (currentBoothIndex - 1 + boothData.length) % boothData.length;
        updateLightbox(currentBoothIndex);
        updateBooth(currentBoothIndex);
      });
    }

    if (lightboxNextBtn) {
      lightboxNextBtn.addEventListener('click', () => {
        currentBoothIndex = (currentBoothIndex + 1) % boothData.length;
        updateLightbox(currentBoothIndex);
        updateBooth(currentBoothIndex);
      });
    }

    if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (e) => {
      if (!photoLightbox || !photoLightbox.classList.contains('active')) return;
      if (e.key === 'ArrowLeft') {
        currentBoothIndex = (currentBoothIndex - 1 + boothData.length) % boothData.length;
        updateLightbox(currentBoothIndex);
        updateBooth(currentBoothIndex);
      } else if (e.key === 'ArrowRight') {
        currentBoothIndex = (currentBoothIndex + 1) % boothData.length;
        updateLightbox(currentBoothIndex);
        updateBooth(currentBoothIndex);
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    });

    // Auto-advance photo booth every 4 seconds
    setInterval(() => {
      if (!photoLightbox || !photoLightbox.classList.contains('active')) {
        currentBoothIndex = (currentBoothIndex + 1) % boothData.length;
        updateBooth(currentBoothIndex);
      }
    }, 4000);

    updateBooth(currentBoothIndex);
  }
});

