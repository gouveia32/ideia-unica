import Link from 'next/link';

function Home(params) {
    return (<div>
            <h1>Home</h1>

            <Link href="/sobre">
                <a>Acessar a página Sobre</a>
            </Link>

        </div>)
}

export default Home