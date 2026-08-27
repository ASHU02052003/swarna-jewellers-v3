import { useMemo, useState } from 'react';
import {
  Heart,
  Search,
  Menu,
  X,
  ArrowRight,
  MapPin,
  MessageCircle,
  Sparkles,
  Phone,
} from 'lucide-react';

import {
  products,
  categories,
  type Product,
} from './products';

import homepagePic from './assets/products/homepage/homepagepic.png';

function money(n: number) {
  return '₹' + n.toLocaleString('en-IN');
}

const WHATSAPP_NUMBER = '919362774379';
const PHONE_NUMBER = '+91 93627 74379';

export default function App() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [menu, setMenu] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);

  const visible = useMemo(() => {
    const search = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        category === 'All' ||
        product.category.toLowerCase() === category.toLowerCase();

      const matchesSearch =
        search === '' ||
        product.name.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search) ||
        product.gender?.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [category, query]);

  const toggleWish = (id: number) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const selectCategory = (value: string) => {
    setCategory(value);
    setQuery('');

    setTimeout(() => {
      document
        .getElementById('collections')
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const categoryProducts = categories
    .filter((item) => item !== 'All')
    .map((categoryName) => {
      const product = products.find(
        (item) => item.category === categoryName
      );

      return {
        category: categoryName,
        image: product?.image,
      };
    });

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hello Swarna Jewellers, I would like to know about your jewellery collection.'
  )}`;

  return (
    <div className="app">

      {/* TOP BAR */}
      <div className="topbar">
        <span>Book a private jewellery consultation</span>

        <a href={`tel:${PHONE_NUMBER}`}>
          <Phone size={14} />
          {PHONE_NUMBER}
        </a>
      </div>

      {/* HEADER */}
      <header>

        <button
          className="icon mobile"
          onClick={() => setMenu((value) => !value)}
          aria-label="Open menu"
        >
          {menu ? <X /> : <Menu />}
        </button>

        <a
          className="logo"
          href="#"
          onClick={(event) => {
            event.preventDefault();
            setCategory('All');
            setQuery('');
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }}
        >
          SWARNA<span>JEWELLERS</span>
        </a>

        <nav className={menu ? 'open' : ''}>

          <a
            href="#collections"
            onClick={() => setMenu(false)}
          >
            Collections
          </a>

          <a
            href="#story"
            onClick={() => setMenu(false)}
          >
            Our Story
          </a>

          <a
            href="#services"
            onClick={() => setMenu(false)}
          >
            Services
          </a>

          <a
            href="#stores"
            onClick={() => setMenu(false)}
          >
            Stores
          </a>

        </nav>

        <div className="actions">

          {/* SEARCH */}
          <label className="search">

            <Search size={18} />

            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setCategory('All');
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  document
                    .getElementById('collections')
                    ?.scrollIntoView({
                      behavior: 'smooth',
                    });
                }
              }}
              placeholder="Search jewellery"
              aria-label="Search jewellery"
            />

            {query && (
              <button
                type="button"
                className="search-clear"
                onClick={() => setQuery('')}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}

          </label>

          {/* WISHLIST */}
          <button
            type="button"
            className="icon wishlist-button"
            title="Wishlist"
            aria-label={`Wishlist, ${wishlist.length} items`}
            onClick={() => {
              if (wishlist.length > 0) {
                document
                  .getElementById('collections')
                  ?.scrollIntoView({
                    behavior: 'smooth',
                  });
              }
            }}
          >
            <Heart
              fill={wishlist.length > 0 ? 'currentColor' : 'none'}
            />

            {wishlist.length > 0 && (
              <b>{wishlist.length}</b>
            )}
          </button>

        </div>

      </header>

      <main>

        {/* HERO */}
        <section className="hero">

          <div className="hero-copy">

            <p className="eyebrow">
              <Sparkles size={16} />
              Crafted for your forever
            </p>

            <h1>
              Jewellery with
              <br />
              <em>a point of view.</em>
            </h1>

            <p>
              Made for the stories you will keep telling.
              Explore gold and diamond jewellery for
              everyday elegance, celebrations and forever
              moments.
            </p>

            <div className="hero-buttons">

              <button
                type="button"
                className="button"
                onClick={() => selectCategory('All')}
              >
                Explore Collection
                <ArrowRight size={18} />
              </button>

              <a
                className="hero-phone"
                href={`tel:${PHONE_NUMBER}`}
              >
                <Phone size={17} />
                {PHONE_NUMBER}
              </a>

            </div>

          </div>

          {/* ORIGINAL HOMEPAGE IMAGE */}
          <div className="hero-image">
            <img
              src={homepagePic}
              alt="Swarna Jewellers jewellery collection"
            />
          </div>

        </section>

        {/* RATES */}
        <section className="rates" id="rates">

          <div>
            <small>22K GOLD</small>

            <strong>
              ₹1,53,600 / 10g
            </strong>

            <span>
              India indicative rate · 25 Aug 2026
            </span>
          </div>

          <div>
            <small>999 SILVER</small>

            <strong>
              ₹2,650 / 10g
            </strong>

            <span>
              India indicative rate · 25 Aug 2026
            </span>
          </div>

          <div className="rate-note">

            <small>IMPORTANT</small>

            <span>
              Rates are indicative and may change during
              the day. Please contact Swarna Jewellers for
              the latest store rate and jewellery details.
            </span>

          </div>

        </section>

        {/* CATEGORY SHOWCASE */}
        <section className="category-showcase section">

          <div className="section-head">

            <div>

              <p className="eyebrow">
                SHOP BY CATEGORY
              </p>

              <h2>
                Explore more, discover your style
              </h2>

            </div>

          </div>

          <div className="category-grid">

            {categoryProducts.map((item) => (

              <button
                type="button"
                className="category-tile"
                key={item.category}
                onClick={() =>
                  selectCategory(item.category)
                }
              >

                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.category}
                    loading="lazy"
                  />
                ) : (
                  <div className="category-placeholder">
                    {item.category}
                  </div>
                )}

                <div>
                  <span>{item.category}</span>
                  <ArrowRight size={17} />
                </div>

              </button>

            ))}

          </div>

        </section>

        {/* COLLECTION */}
        <section
          id="collections"
          className="section"
        >

          <div className="section-head">

            <div>

              <p className="eyebrow">
                THE COLLECTION
              </p>

              <h2>
                Made to be remembered
              </h2>

            </div>

            <span>
              {visible.length} pieces
            </span>

          </div>

          {/* FILTER BUTTONS */}
          <div className="filters">

            {categories.map((item) => (

              <button
                type="button"
                className={
                  category === item
                    ? 'active'
                    : ''
                }
                onClick={() =>
                  selectCategory(item)
                }
                key={item}
              >
                {item}
              </button>

            ))}

          </div>

          {/* ACTIVE SEARCH */}
          {query && (
            <div className="search-result-info">
              Searching for:
              <strong> "{query}"</strong>
              <span>
                {' '}({visible.length} results)
              </span>
            </div>
          )}

          {/* PRODUCTS */}
          {visible.length === 0 ? (

            <div className="empty-state">

              <h3>
                No jewellery found
              </h3>

              <p>
                Try another search or select a different
                category.
              </p>

              <button
                type="button"
                className="button"
                onClick={() => {
                  setQuery('');
                  setCategory('All');
                }}
              >
                View all jewellery
              </button>

            </div>

          ) : (

            <div className="grid">

              {visible.map((product) => (

                <article
                  className="card"
                  key={product.id}
                >

                  <div className="product-image">

                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                    />

                    <button
                      type="button"
                      className={
                        wishlist.includes(product.id)
                          ? 'wish active'
                          : 'wish'
                      }
                      onClick={() =>
                        toggleWish(product.id)
                      }
                      aria-label={
                        wishlist.includes(product.id)
                          ? `Remove ${product.name} from wishlist`
                          : `Add ${product.name} to wishlist`
                      }
                    >

                      <Heart
                        fill={
                          wishlist.includes(product.id)
                            ? 'currentColor'
                            : 'none'
                        }
                      />

                    </button>

                  </div>

                  <div className="product-info">

                    <small>
                      {product.category}
                    </small>

                    <h3>
                      {product.name}
                    </h3>

                    <strong>
                      {money(product.price)}
                    </strong>

                    <button
                      type="button"
                      onClick={() =>
                        setSelected(product)
                      }
                    >
                      View details
                    </button>

                  </div>

                </article>

              ))}

            </div>

          )}

        </section>

        {/* STORY */}
        <section
          id="story"
          className="story section"
        >

          <div>

            <p className="eyebrow">
              OUR STORY
            </p>

            <h2>
              Heritage in every detail.
            </h2>

            <p>
              For generations, Swarna Jewellers has
              celebrated Indian craftsmanship with
              contemporary design. Every piece is
              thoughtfully finished, quality checked and
              created to be passed forward.
            </p>

            <a
              className="text-link"
              href="#services"
            >
              Discover our story
              <ArrowRight size={16} />
            </a>

          </div>

          <div className="story-image" />

        </section>

        {/* SERVICES */}
        <section
          id="services"
          className="services section"
        >

          <p className="eyebrow">
            THE SWARNA EXPERIENCE
          </p>

          <h2>
            Made personal for you.
          </h2>

          <div className="service-grid">

            <div>
              <Sparkles />

              <h3>
                Private Consultation
              </h3>

              <p>
                One-to-one guidance for bridal, gifting
                and special occasions.
              </p>
            </div>

            <div>
              <Heart />

              <h3>
                Custom Jewellery
              </h3>

              <p>
                Turn your idea into a one-of-a-kind piece
                with our design team.
              </p>
            </div>

            <div>
              <MapPin />

              <h3>
                Store Experience
              </h3>

              <p>
                Visit us for expert styling, trials and
                transparent guidance.
              </p>
            </div>

          </div>

        </section>

        {/* STORE */}
        <section
          id="stores"
          className="store section"
        >

          <div>

            <p className="eyebrow">
              VISIT SWARNA
            </p>

            <h2>
              Jewellery with a point of view.
            </h2>

            <p>
              Visit our showroom at Bank Road, Belonia,
              South Tripura. Our team can help you explore
              gold and diamond jewellery and assist you
              with your jewellery requirements.
            </p>

            <div className="store-actions">

              <a
                className="button"
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
              >
                Chat on WhatsApp
                <MessageCircle size={17} />
              </a>

              <a
                className="phone-button"
                href={`tel:${PHONE_NUMBER}`}
              >
                <Phone size={17} />
                Call {PHONE_NUMBER}
              </a>

            </div>

          </div>

        </section>

      </main>

      {/* PRODUCT DETAILS MODAL */}
      {selected && (

        <div
          className="modal-backdrop"
          onClick={() => setSelected(null)}
        >

          <div
            className="product-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              type="button"
              className="modal-close"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              <X />
            </button>

            <img
              src={selected.image}
              alt={selected.name}
            />

            <div className="modal-info">

              <small>
                {selected.category}
              </small>

              <h2>
                {selected.name}
              </h2>

              <strong>
                {money(selected.price)}
              </strong>

              <p>
                This jewellery piece is available from
                Swarna Jewellers. Contact us for the latest
                price, availability, gold rate and detailed
                product information.
              </p>

              <div className="modal-actions">

                <a
                  className="button"
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    `Hello Swarna Jewellers, I am interested in ${selected.name}. Please share details and latest price.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Enquire on WhatsApp
                  <MessageCircle size={17} />
                </a>

                <a
                  className="phone-button"
                  href={`tel:${PHONE_NUMBER}`}
                >
                  <Phone size={17} />
                  Call Us
                </a>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}
