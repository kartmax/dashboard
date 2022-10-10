document.addEventListener('DOMContentLoaded', () => {

    // Custom JS

    // preloader
   document.body.classList.add('loaded_hiding');
   window.addEventListener('load', function () {
      document.body.classList.add('loaded');
      document.body.classList.remove('loaded_hiding');
   })

   // for placholder
   const inputs    = document.querySelectorAll('input')
          textarea = document.querySelectorAll('textarea');

   [...inputs, ...textarea].forEach((elem) => {
      let placeholder = elem.getAttribute('placeholder');
      elem.addEventListener('focus', () => {elem.setAttribute('placeholder', '')});
      elem.addEventListener('focusout', () => { elem.setAttribute('placeholder', placeholder) })
   });

   // Get value property
   const getCSSCustomProp = (propKey, element = document.documentElement, castAs = 'string') => {
      let response = getComputedStyle(element).getPropertyValue(propKey);
    
      // Если нужно, приводим в порядок строку
      if (response.length) {
        response = response.replace(/"/g, '').trim();
      }
    
      // Преобразуем возвращаемые данные в любой желаемый тип
      switch (castAs) {
        case 'number':
        case 'int':
          return parseInt(response, 10);
        case 'float':
          return parseFloat(response, 10);
        case 'boolean':
        case 'bool':
          return response === 'true' || response === '1';
      }
    
      // Возвращаем результат
      return response;
    };

   // Open/Close Sidebar
   let sizeOpen;
   let sizeClose;
   function getSize() {
      setTimeout(function(){
         sizeOpen = getCSSCustomProp('--size-sidebar-open-for-js', main, 'string');
         sizeClose = getCSSCustomProp('--size-sidebar-close-for-js', main, 'string');
      })
   };
   function giveSize() {
      setTimeout(function() {
         let size = sidebar.classList.contains(className) ? sizeOpen : sizeClose;
         main.style.cssText += (`--size-sidebar : ${size}`);
      })
   }
   getSize();
   window.addEventListener('orientationchange',function(){
      function afterOrientationChange () {
         window.removeEventListener('resize', afterOrientationChange)
         getSize();
         giveSize();
      }
      window.addEventListener('resize', afterOrientationChange);
   });
   const sidebar = document.querySelector('.sidebar');
   const main = document.querySelector('main');
   const className = 'open';
   document.querySelector('.js-open-sd').addEventListener('click', (e) => {
      sidebar.classList.toggle(className);
      e.currentTarget.classList.toggle(className);
      giveSize();
   })


});
