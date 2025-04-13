import './style.scss';
import NewsletterForm from './form';

document.addEventListener('DOMContentLoaded', () => {
    const Newsletter = new NewsletterForm("#newsletter-form");

    window.addEventListener('resize', () => {
      window.matchMedia("(min-width: 57.5rem)").matches ? Newsletter.isDesktop =  true : Newsletter.isDesktop = false;
    });

    (async () => {
        await loadStarsPreset(tsParticles);
      
        await tsParticles.load({
          id: "stars",
          options: {
            background: {
                color: "#36384D",
            },
            preset: "stars",
          },
        });
      })();
});