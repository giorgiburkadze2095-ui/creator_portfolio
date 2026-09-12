import { Reveal } from '../shared/Reveal.js';
import './PersonalStatement.css';

export function PersonalStatement({ text }) {
  if (!text) return null;

  return (
    <section className="section personal-statement">
      <div className="container">
        <Reveal as="p" className="personal-statement__text">
          {text}
        </Reveal>
      </div>
    </section>
  );
}
