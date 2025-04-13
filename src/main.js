import './style.scss';
import NewsletterForm from './form';

document.addEventListener('DOMContentLoaded', () => {
    new NewsletterForm("#newsletter-form");

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