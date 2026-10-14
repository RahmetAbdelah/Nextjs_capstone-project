import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h3>addis eats</h3>

      
      <nav>
        <Link href="/menu">explore menu</Link>
        <Link href="/cart">cart</Link>
        <Link href="/checkout">checkout</Link>


      </nav>

    
    </div>
    
   
  );
}
