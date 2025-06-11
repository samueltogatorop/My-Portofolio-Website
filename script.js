// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Custom cursor
  const cursor = document.querySelector(".cursor")
  const cursorFollower = document.querySelector(".cursor-follower")

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"

    setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px"
      cursorFollower.style.top = e.clientY + "px"
    }, 100)
  })

  document.addEventListener("mousedown", () => {
    cursor.style.width = "8px"
    cursor.style.height = "8px"
    cursorFollower.style.width = "30px"
    cursorFollower.style.height = "30px"
  })

  document.addEventListener("mouseup", () => {
    cursor.style.width = "10px"
    cursor.style.height = "10px"
    cursorFollower.style.width = "40px"
    cursorFollower.style.height = "40px"
  })

  // Elements that should have cursor hover effect
  const hoverElements = document.querySelectorAll("a, button, .project-item, .skill-item, .social-icon")

  hoverElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.style.width = "15px"
      cursor.style.height = "15px"
      cursor.style.backgroundColor = "transparent"
      cursor.style.border = "2px solid var(--accent)"
      cursorFollower.style.width = "50px"
      cursorFollower.style.height = "50px"
    })

    element.addEventListener("mouseleave", () => {
      cursor.style.width = "10px"
      cursor.style.height = "10px"
      cursor.style.backgroundColor = "var(--accent)"
      cursor.style.border = "none"
      cursorFollower.style.width = "40px"
      cursorFollower.style.height = "40px"
    })
  })

  // Header scroll effect
  const header = document.querySelector("header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navLinks.classList.toggle("active")
    document.body.classList.toggle("no-scroll")
  })

  // Close mobile menu when clicking on a link
  const navItems = document.querySelectorAll(".nav-links a")

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navLinks.classList.remove("active")
      document.body.classList.remove("no-scroll")
    })
  })

  // Active navigation link based on scroll position
  const sections = document.querySelectorAll("section")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id")
      }
    })

    navItems.forEach((item) => {
      item.classList.remove("active")
      if (item.getAttribute("href").slice(1) === current) {
        item.classList.add("active")
      }
    })
  })

  // Reveal animations on scroll
  const revealElements = document.querySelectorAll(".reveal-text")

  function revealOnScroll() {
    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("show")
      }
    })
  }

  window.addEventListener("scroll", revealOnScroll)
  revealOnScroll() // Initial check on page load

  // Progress bars animation
  const skillItems = document.querySelectorAll(".skill-item")

  function animateSkills() {
    skillItems.forEach((item) => {
      const progressBar = item.querySelector(".progress-bar")
      const percent = progressBar.getAttribute("data-percent")

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            progressBar.style.width = percent + "%"
            observer.unobserve(entry.target)
          }
        })
      })

      observer.observe(item)
    })
  }

  animateSkills()

  // Project filtering
  const filterButtons = document.querySelectorAll(".filter-btn")
  const projectItems = document.querySelectorAll(".project-item")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      this.classList.add("active")

      const filterValue = this.getAttribute("data-filter")

      projectItems.forEach((item) => {
        if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
          item.style.display = "block"
          setTimeout(() => {
            item.style.opacity = "1"
            item.style.transform = "scale(1)"
          }, 200)
        } else {
          item.style.opacity = "0"
          item.style.transform = "scale(0.8)"
          setTimeout(() => {
            item.style.display = "none"
          }, 500)
        }
      })
    })
  })

  // Contact form validation and submission
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Basic form validation
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      if (name && email && subject && message) {
        // Here you would typically send the form data to a server
        // For this example, we'll just show a success message
        alert("Thank you for your message! I will get back to you soon.")
        contactForm.reset()
      } else {
        alert("Please fill in all fields.")
      }
    })
  }

  // Back to top button
  const backToTopBtn = document.querySelector(".back-to-top")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("active")
    } else {
      backToTopBtn.classList.remove("active")
    }
  })

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Initialize hero section animations
  function initHeroAnimations() {
    const heroElements = document.querySelectorAll(".hero .reveal-text")

    setTimeout(() => {
      heroElements.forEach((element) => {
        element.classList.add("show")
      })
    }, 500)
  }

  initHeroAnimations()
})
