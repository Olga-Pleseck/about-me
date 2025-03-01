// Функция для подсветки активного пункта меню
document.addEventListener('DOMContentLoaded', function() {
  // Получаем текущий путь страницы
  const currentPath = window.location.pathname;
  const filename = currentPath.split('/').pop();
  
  // Находим все ссылки в навигации
  const navLinks = document.querySelectorAll('nav ul li a');
  
  // Проходим по всем ссылкам и проверяем, соответствует ли href текущему пути
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    
    // Если это главная страница
    if (filename === '' || filename === 'index.html') {
      if (linkHref === 'index.html' || linkHref === './') {
        link.classList.add('active');
      }
    } 
    // Для других страниц
    else if (linkHref === filename) {
      link.classList.add('active');
    }
    
    // Если у ссылки нет атрибута href, но текст соответствует текущей странице
    if (!linkHref && currentPath.includes(link.textContent.toLowerCase().replace(/\s+/g, '_'))) {
      link.classList.add('active');
    }
  });
  
  // Плавная прокрутка для якорей
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100, // Отступ сверху
          behavior: 'smooth'
        });
      }
    });
  });
});

// Функция для модального окна с фотографиями
document.addEventListener('DOMContentLoaded', function() {
  // Создаем модальное окно
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <div class="modal-image-container">
        <img class="modal-image" src="" alt="">
        <button class="prev-button">&lt;</button>
        <button class="next-button">&gt;</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  
  // Получаем элементы модального окна
  const modalImg = modal.querySelector('.modal-image');
  const closeBtn = modal.querySelector('.close');
  const prevBtn = modal.querySelector('.prev-button');
  const nextBtn = modal.querySelector('.next-button');
  
  // Массив для хранения всех фотографий текущей секции
  let currentImages = [];
  let currentIndex = 0;
  
  // Добавляем обработчики событий для всех фотографий
  const photos = document.querySelectorAll('.methodologies-photo');
  
  if (photos.length === 0) {
    console.log('Фотографии не найдены на странице');
  } else {
    console.log('Найдено ' + photos.length + ' фотографий');
  }
  
  photos.forEach(photo => {
    photo.style.cursor = 'pointer';
    photo.addEventListener('click', function(e) {
      console.log('Клик по фотографии', this.src);
      e.preventDefault();
      
      // Находим все фотографии в текущем контейнере
      const container = this.closest('.methodologies-wrapper') || this.closest('.photo-container') || this.closest('.achieve-container');
      if (container) {
        currentImages = Array.from(container.querySelectorAll('.methodologies-photo'));
      } else {
        // Если контейнер не найден, используем только текущее изображение
        currentImages = [this];
      }
      currentIndex = currentImages.indexOf(this);
      
      // Открываем модальное окно с текущей фотографией
      modal.style.display = 'flex';
      modalImg.src = this.src;
      
      // Показываем/скрываем кнопки навигации в зависимости от количества фотографий
      if (currentImages.length <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
      } else {
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
      }
    });
  });
  
  // Закрытие модального окна
  closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
  });
  
  // Закрытие модального окна при клике вне изображения
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
  
  // Переключение на предыдущее изображение
  prevBtn.addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    modalImg.src = currentImages[currentIndex].src;
  });
  
  // Переключение на следующее изображение
  nextBtn.addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    modalImg.src = currentImages[currentIndex].src;
  });
  
  // Навигация с помощью клавиатуры
  document.addEventListener('keydown', function(e) {
    if (modal.style.display === 'flex') {
      if (e.key === 'ArrowLeft' && currentImages.length > 1) {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        modalImg.src = currentImages[currentIndex].src;
      } else if (e.key === 'ArrowRight' && currentImages.length > 1) {
        currentIndex = (currentIndex + 1) % currentImages.length;
        modalImg.src = currentImages[currentIndex].src;
      } else if (e.key === 'Escape') {
        modal.style.display = 'none';
      }
    }
  });
}); 