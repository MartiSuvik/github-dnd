export const useFooterContact = () => {
  const triggerFooterContact = () => {
    const footerElement = document.querySelector('#footer');
    if (footerElement instanceof HTMLElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const footerContactBtn = document.querySelector(
          '[data-footer-contact]'
        ) as HTMLButtonElement;
        if (footerContactBtn) {
          footerContactBtn.click();
        }
      }, 800);
    }
  };

  return { triggerFooterContact };
};
