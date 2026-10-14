import Link from "next/link"

export default function NotFound(){
    return(
        <main>
            <p>404</p>
            <h1>Dish not found</h1>

            <Link href="/menu">backto menu</Link>
            <Link href="/">Home</Link>
        </main>
    )
}