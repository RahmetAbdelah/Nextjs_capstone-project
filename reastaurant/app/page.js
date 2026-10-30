import Image from "next/image";
import Link from "next/link";
import { dishes } from "@/lib/dishes";

const featuredDishes = dishes.slice(0, 3);

export default function Home() {
  return (
    <main className="home-page">
      <section aria-labelledby="home-title" className="home-hero">
        <Image
          alt="A traditional Ethiopian Doro Wat meal served on injera"
          className="home-hero-image"
          fill
          priority
          sizes="100vw"
          src="/images/dishes/doro-wat.webp"
        />
        <div aria-hidden="true" className="home-hero-shade" />
        <div className="home-hero-content">
          <p className="home-eyebrow">A seat at our table</p>
          <h1 className="home-title" id="home-title">
            Gather around
            <br />
            <span>something good.</span>
          </h1>
          <p className="home-hero-description">
            Slow-simmered favourites, vibrant spices, and the joy of Ethiopian food made to share.
          </p>
          <div className="home-actions">
            <Link className="button-primary home-hero-button" href="/menu">
              Explore the menu <span aria-hidden="true">→</span>
            </Link>
            <Link className="home-hero-text-link" href="#our-story">
              Get to know us
            </Link>
          </div>
          <div aria-label="Our kitchen" className="home-hero-note">
            <span aria-hidden="true" className="home-hero-note-mark">✳</span>
            <span>Made with care.<br />Best enjoyed together.</span>
          </div>
        </div>
        <span aria-hidden="true" className="home-hero-index">ADDIS ABABA · ETHIOPIAN KITCHEN</span>
      </section>

      <section aria-label="What makes Addis Eats special" className="home-values">
        <article className="home-value">
          <span aria-hidden="true" className="home-value-icon">01</span>
          <div>
            <h2>Rooted in tradition</h2>
            <p>Beloved Ethiopian dishes, full of warmth and character.</p>
          </div>
        </article>
        <article className="home-value">
          <span aria-hidden="true" className="home-value-icon">02</span>
          <div>
            <h2>Made for sharing</h2>
            <p>Bring your favourites together and make a meal of it.</p>
          </div>
        </article>
        <article className="home-value">
          <span aria-hidden="true" className="home-value-icon">03</span>
          <div>
            <h2>Easy to order</h2>
            <p>Browse, choose your dishes, and place your order online.</p>
          </div>
        </article>
      </section>

      <section aria-labelledby="home-menu-title" className="home-section home-menu-section">
        <div className="home-section-heading">
          <div>
            <p className="section-eyebrow">A few favourites</p>
            <h2 className="home-section-title" id="home-menu-title">Made to bring you back.</h2>
            <p className="home-section-description">
              From a gently spiced stew to a colourful vegetarian platter, there is something lovely waiting for you.
            </p>
          </div>
          <Link className="button-secondary home-menu-link" href="/menu">
            See the full menu <span aria-hidden="true">→</span>
          </Link>
        </div>

        <ul className="home-dish-grid">
          {featuredDishes.map((dish, index) => (
            <li className="home-dish-card" key={dish.id}>
              <Link
                aria-label={`Discover ${dish.name}`}
                className="home-dish-image-link"
                href={`/menu/${dish.id}`}
              >
                <Image
                  alt={dish.imageAlt}
                  className="home-dish-image"
                  height={600}
                  sizes="(max-width: 700px) 90vw, (max-width: 1040px) 44vw, 360px"
                  src={dish.image}
                  width={800}
                />
                <span className="home-dish-number">0{index + 1}</span>
              </Link>
              <div className="home-dish-copy">
                <div>
                  <p className="home-dish-category">{dish.category}</p>
                  <h3><Link href={`/menu/${dish.id}`}>{dish.name}</Link></h3>
                </div>
                <p className="home-dish-price">{dish.currency} {dish.price.toFixed(0)}</p>
              </div>
              <p className="home-dish-description">{dish.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="our-story-title" className="home-story" id="our-story">
        <div className="home-story-art">
          <Image
            alt="A colourful platter of Ethiopian vegetarian dishes served on injera"
            className="home-story-image"
            height={700}
            sizes="(max-width: 760px) 90vw, 42vw"
            src="/images/dishes/beyaynetu.webp"
            width={900}
          />
          <span className="home-story-stamp">Good food<br />good company</span>
        </div>
        <div className="home-story-copy">
          <p className="section-eyebrow">A little about us</p>
          <h2 className="home-section-title" id="our-story-title">
            Some meals just feel like home.
          </h2>
          <p>
            Ethiopian food is an invitation to slow down, pass a plate, and share a little more. Addis Eats brings
            the dishes we love to your table, with bold spices, generous flavours, and room for everyone.
          </p>
          <p>
            Find a new favourite or order a familiar one. Either way, we are glad you are here.
          </p>
          <Link className="home-story-link" href="/menu">
            Find your favourite <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section aria-labelledby="home-steps-title" className="home-order-section">
        <div className="home-order-heading">
          <p className="section-eyebrow">From our menu to your table</p>
          <h2 className="home-section-title" id="home-steps-title">A good meal is just a few steps away.</h2>
        </div>
        <ol className="home-order-steps">
          <li>
            <span className="home-step-number">01</span>
            <h3>Choose what you love</h3>
            <p>Take a look through the menu and add a few favourites to your cart.</p>
          </li>
          <li>
            <span className="home-step-number">02</span>
            <h3>Tell us where to go</h3>
            <p>Share your contact details and delivery neighbourhood at checkout.</p>
          </li>
          <li>
            <span className="home-step-number">03</span>
            <h3>We’ll take it from here</h3>
            <p>Place your order and use your tracking page to follow its status.</p>
          </li>
        </ol>
        <Link className="button-primary home-order-button" href="/menu">
          Start with the menu <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section aria-labelledby="home-location-title" className="home-location">
        <div className="home-location-copy">
          <p className="section-eyebrow">From Addis, with love</p>
          <h2 className="home-section-title" id="home-location-title">Our home is Addis Ababa.</h2>
          <p>
            Addis Eats celebrates the flavours of Ethiopia’s capital. Explore the city on the map, then tell us your
            neighbourhood when you place an order.
          </p>
          <Link
            className="home-location-link"
            href="https://www.openstreetmap.org/?mlat=9.0192&mlon=38.7525#map=12/9.0192/38.7525"
          >
            Explore Addis Ababa <span aria-hidden="true">↗</span>
          </Link>
          <p className="home-map-note">Map centered on Addis Ababa; it does not mark a verified restaurant address.</p>
        </div>
        <div className="home-map-frame">
          <iframe
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.openstreetmap.org/export/embed.html?bbox=38.65%2C8.92%2C38.86%2C9.12&layer=mapnik&marker=9.0192%2C38.7525"
            title="OpenStreetMap centered on Addis Ababa, Ethiopia"
          />
          <p className="home-map-attribution">
            Map data © <Link href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</Link>
          </p>
        </div>
      </section>

      <section aria-labelledby="home-cta-title" className="home-final-cta">
        <span aria-hidden="true" className="home-final-ornament">✳</span>
        <p className="home-eyebrow">There’s a place for you here</p>
        <h2 id="home-cta-title">Let’s make your next meal a good one.</h2>
        <Link className="button-primary home-hero-button" href="/menu">
          Browse the menu <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}
