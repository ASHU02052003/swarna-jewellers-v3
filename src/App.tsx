import { useMemo, useState } from 'react';
import { Heart, Search, ShoppingBag, Menu, X, ArrowRight, MapPin, MessageCircle, Sparkles } from 'lucide-react';

type Product = {
  id: number; name: string; category: string; price: number; image: string;
};

const products: Product[] = [
  {id:1,name:'Necklaces Signature 1',category:'Necklaces',price:32211,image:'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80'},
  {id:2,name:'Necklaces Signature 2',category:'Necklaces',price:39522,image:'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80'},
  {id:3,name:'Necklaces Signature 3',category:'Necklaces',price:46833,image:'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=900&q=80'},
  {id:4,name:'Necklaces Signature 4',category:'Necklaces',price:54144,image:'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80'},
  {id:5,name:'Necklaces Signature 5',category:'Necklaces',price:61455,image:'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80'},
  {id:6,name:'Necklaces Signature 6',category:'Necklaces',price:68766,image:'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=900&q=80'},
  {id:7,name:'Rings Signature 1',category:'Rings',price:76077,image:'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80'},
  {id:8,name:'Rings Signature 2',category:'Rings',price:83388,image:'https://images.unsplash.com/photo-1603561596112-db8d7e4e7a9d?auto=format&fit=crop&w=900&q=80'},
  {id:9,name:'Rings Signature 3',category:'Rings',price:90699,image:'https://images.unsplash.com/photo-1619119069152-a2b331eb392a?auto=format&fit=crop&w=900&q=80'},
  {id:10,name:'Rings Signature 4',category:'Rings',price:98010,image:'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80'},
  {id:11,name:'Rings Signature 5',category:'Rings',price:105321,image:'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80'},
  {id:12,name:'Rings Signature 6',category:'Rings',price:112632,image:'https://images.unsplash.com/photo-1627293509201-cd4c5e6b8f3b?auto=format&fit=crop&w=900&q=80'},
  {id:13,name:'Earrings Signature 1',category:'Earrings',price:119943,image:'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80'},
  {id:14,name:'Earrings Signature 2',category:'Earrings',price:127254,image:'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80'},
  {id:15,name:'Earrings Signature 3',category:'Earrings',price:134565,image:'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=900&q=80'},
  {id:16,name:'Earrings Signature 4',category:'Earrings',price:141876,image:'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80'},
  {id:17,name:'Earrings Signature 5',category:'Earrings',price:149187,image:'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80'},
  {id:18,name:'Earrings Signature 6',category:'Earrings',price:156498,image:'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=900&q=80'},
  {id:19,name:'Bangles Signature 1',category:'Bangles',price:163809,image:'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80'},
  {id:20,name:'Bangles Signature 2',category:'Bangles',price:171120,image:'https://images.unsplash.com/photo-1603561596112-db8d7e4e7a9d?auto=format&fit=crop&w=900&q=80'},
  {id:21,name:'Bangles Signature 3',category:'Bangles',price:178431,image:'https://images.unsplash.com/photo-1619119069152-a2b331eb392a?auto=format&fit=crop&w=900&q=80'},
  {id:22,name:'Bangles Signature 4',category:'Bangles',price:185742,image:'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80'},
  {id:23,name:'Bangles Signature 5',category:'Bangles',price:193053,image:'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80'},
  {id:24,name:'Bangles Signature 6',category:'Bangles',price:200364,image:'https://images.unsplash.com/photo-1627293509201-cd4c5e6b8f3b?auto=format&fit=crop&w=900&q=80'},
  {id:25,name:'Bridal Signature 1',category:'Bridal',price:207675,image:'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80'},
  {id:26,name:'Bridal Signature 2',category:'Bridal',price:214986,image:'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80'},
  {id:27,name:'Bridal Signature 3',category:'Bridal',price:222297,image:'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=900&q=80'},
  {id:28,name:'Bridal Signature 4',category:'Bridal',price:229608,image:'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80'},
  {id:29,name:'Bridal Signature 5',category:'Bridal',price:236919,image:'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80'},
  {id:30,name:'Bridal Signature 6',category:'Bridal',price:244230,image:'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=900&q=80'},
  {id:31,name:'Pendants Signature 1',category:'Pendants',price:251541,image:'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80'},
  {id:32,name:'Pendants Signature 2',category:'Pendants',price:258852,image:'https://images.unsplash.com/photo-1603561596112-db8d7e4e7a9d?auto=format&fit=crop&w=900&q=80'},
  {id:33,name:'Pendants Signature 3',category:'Pendants',price:266163,image:'https://images.unsplash.com/photo-1619119069152-a2b331eb392a?auto=format&fit=crop&w=900&q=80'},
  {id:34,name:'Pendants Signature 4',category:'Pendants',price:273474,image:'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80'},
  {id:35,name:'Pendants Signature 5',category:'Pendants',price:280785,image:'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80'},
  {id:36,name:'Pendants Signature 6',category:'Pendants',price:288096,image:'https://images.unsplash.com/photo-1627293509201-cd4c5e6b8f3b?auto=format&fit=crop&w=900&q=80'}
];

const cats = ['All','Necklaces','Rings','Earrings','Bangles','Bridal','Pendants'];

function money(n:number){ return '₹' + n.toLocaleString('en-IN'); }

export default function App(){
  const [category,setCategory]=useState('All');
  const [query,setQuery]=useState('');
  const [menu,setMenu]=useState(false);
  const [wishlist,setWishlist]=useState<number[]>([]);
  const [selected,setSelected]=useState<Product|null>(null);

  const visible=useMemo(()=>products.filter(p=>
    (category==='All'||p.category===category) &&
    p.name.toLowerCase().includes(query.toLowerCase())
  ),[category,query]);

  const toggleWish=(id:number)=>setWishlist(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]);

  return <div className="app">
    <div className="topbar">Complimentary shipping on orders above ₹25,000 · Book a private jewellery consultation</div>
    <header>
      <button className="icon mobile" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
      <a className="logo" href="#">SWARNA<span>JEWELLERS</span></a>
      <nav className={menu?'open':''}>
        <a href="#collections" onClick={()=>setMenu(false)}>Collections</a>
        <a href="#story" onClick={()=>setMenu(false)}>Our Story</a>
        <a href="#services" onClick={()=>setMenu(false)}>Services</a>
        <a href="#stores" onClick={()=>setMenu(false)}>Stores</a>
      </nav>
      <div className="actions">
        <label className="search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search jewellery"/></label>
        <button className="icon" title="Wishlist"><Heart/><b>{wishlist.length}</b></button>
        <button className="icon" title="Enquiry"><ShoppingBag/></button>
      </div>
    </header>

    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><Sparkles size={16}/> Crafted for your forever</p>
          <h1>Jewellery with<br/><em>a point of view.</em></h1>
          <p>Made for the stories you will keep telling. Explore gold and diamond jewellery for everyday elegance, celebrations and forever moments.</p>
          <a className="button" href="#collections">Explore Collection <ArrowRight size={18}/></a>
        </div>
        <div className="hero-image"/>
      </section>

      <section className="rates" id="rates">
        <div><small>24K GOLD</small><strong>₹1,63,090 / 10g</strong><span>India indicative rate · 23 Aug 2026</span></div>
        <div><small>22K GOLD</small><strong>₹1,49,500 / 10g</strong><span>India indicative rate · 23 Aug 2026</span></div>
        <div><small>999 SILVER</small><strong>₹2,47,220 / kg</strong><span>Approx. India market rate · 22 Aug 2026</span></div>
        <div className="rate-note"><small>IMPORTANT</small><span>Rates are indicative and may change during the day. Final Swarna Jewellers billing rates, making charges, GST and stone value apply at purchase.</span></div>
      </section>

      <section className="category-showcase section">
        <div className="section-head"><div><p className="eyebrow">SHOP BY CATEGORY</p><h2>Explore more, discover your style</h2></div></div>
        <div className="category-grid">
          {categories.map((c,i)=><a className="category-tile" href="#collections" key={c} onClick={()=>setCategory(c)}><img src={imgs[i]} loading="lazy"/><div><span>{c}</span><ArrowRight size={17}/></div></a>)}
        </div>
      </section>

      <section id="collections" className="section">
        <div className="section-head"><div><p className="eyebrow">THE COLLECTION</p><h2>Made to be remembered</h2></div><a href="#collections">View all <ArrowRight size={16}/></a></div>
        <div className="filters">{cats.map(c=><button className={category===c?'active':''} onClick={()=>setCategory(c)} key={c}>{c}</button>)}</div>
        <div className="grid">{visible.map(p=><article className="card" key={p.id}>
          <div className="product-image"><img src={p.image} loading="lazy"/><button className="wish" onClick={()=>toggleWish(p.id)}><Heart fill={wishlist.includes(p.id)?'currentColor':'none'}/></button></div>
          <div className="product-info"><small>{p.category}</small><h3>{p.name}</h3><strong>{money(p.price)}</strong><button onClick={()=>setSelected(p)}>View details</button></div>
        </article>)}</div>
      </section>

      <section id="story" className="story section">
        <div><p className="eyebrow">OUR STORY</p><h2>Heritage in every detail.</h2><p>For generations, Swarna Jewellers has celebrated Indian craftsmanship with contemporary design. Every piece is thoughtfully finished, quality checked and created to be passed forward.</p><a className="text-link" href="#services">Discover our story <ArrowRight size={16}/></a></div>
        <div className="story-image"/>
      </section>

      <section id="services" className="services section">
        <p className="eyebrow">THE SWARNA EXPERIENCE</p><h2>Made personal for you.</h2>
        <div className="service-grid">
          <div><Sparkles/><h3>Private Consultation</h3><p>One-to-one guidance for bridal, gifting and special occasions.</p></div>
          <div><Heart/><h3>Custom Jewellery</h3><p>Turn your idea into a one-of-a-kind piece with our design team.</p></div>
          <div><MapPin/><h3>Store Experience</h3><p>Visit us for expert styling, trials and transparent guidance.</p></div>
        </div>
      </section>

      <section id="stores" className="store section">
        <div>
          <p className="eyebrow">VISIT SWARNA</p>
          <h2>Jewellery with a point of view.</h2>
          <p>Visit our showroom in Bank of Belonia, South Tripura. Our team can help you explore gold and diamond jewellery, including Kisna collections available through our authorised business relationship.</p>
          <a className="button" href="https://wa.me/919612091964?text=Hello%20Swarna%20Jewellers%2C%20I%20would%20like%20to%20know%20about%20your%20jewellery%20collection." target="_blank" rel="noreferrer">Chat on WhatsApp <MessageCircle size={17}/></a>
        </div>
        <div className="store-box">
          <MapPin size={28}/>
          <h3>Swarna Jewellers</h3>
          <p>Bank of Belonia, South Tripura</p>
          <p>Opposite Punjab National Bank (PNB)</p>
          <span>Mon–Sat · 10:30 AM–8:00 PM</span>
          <a className="phone" href="tel:+919612091964">+91 96120 91964</a>
          <a className="map-link" href="https://www.google.com/maps/search/?api=1&query=Bank+of+Belonia+South+Tripura" target="_blank" rel="noreferrer">Get directions <ArrowRight size={15}/></a>
        </div>
      </section>
    </main>

    <footer><div className="logo">SWARNA<span>JEWELLERS</span></div><p>Timeless jewellery. Thoughtfully crafted.</p><div>© 2026 Swarna Jewellers</div></footer>

    <a className="concierge" href="https://wa.me/919612091964?text=Hello%20Swarna%20Jewellers"><MessageCircle/> Jewellery Concierge</a>

    {selected && <div className="modal" onClick={()=>setSelected(null)}><div className="modal-card" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSelected(null)}><X/></button><img src={selected.image}/><div><small>{selected.category}</small><h2>{selected.name}</h2><h3>{money(selected.price)}</h3><p>Crafted with attention to detail. Contact our jewellery concierge for availability, customization and a private consultation.</p><a className="button" href="mailto:hello@swarna-jewellers.com">Enquire now</a></div></div></div>}
  </div>
}