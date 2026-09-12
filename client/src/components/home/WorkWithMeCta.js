import { Link } from 'react-router-dom';
import { Reveal } from '../shared/Reveal.js';
import './WorkWithMeCta.css';

export function WorkWithMeCta({ title, text }) {
  return (
    <section className="section work-cta">
      <div className="container">
        <Reveal className="work-cta__box">
          <h2 className="work-cta__title">{title || "Let's work together"}</h2>
          <p className="work-cta__text">{text || 'Reach out if you would like to collaborate.'}</p>
          <Link to="/collaborate" className="button button--primary">
            Work with me
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
