"use client"
import WhatsAppButton from '@/app/componentes/whatsappButton/WhatsappButton';
import './quienesSomos.css'


export default function Home() {
    const phoneNumber = '2284664116';
    return (
        <>
            <div className="about-us">
                <header className="about-us-header">
                    <h1>¿Quiénes Somos?</h1>
                </header>
                <main className="about-us-content">
                    <section className="about-us-section">
                        <h2>Bienvenidos a Casa Lindner</h2>
                        <p>Desde el 2 de junio de 1967, nuestra empresa ha sido un pilar en la comunidad de Villa Alfredo Fortabat, Olavarría. Fundada por el Sr. Coronel Mario Lindner y su esposa Emilia Antunez Roda, comenzamos como un pequeño proyecto familiar con la esperanza de crecer y servir a nuestra comunidad.</p>
                    </section>
                    <section className="about-us-section">
                        <h2>Nuestra Historia</h2>
                        <p>Lo que comenzó en un modesto salón ha crecido de manera significativa a lo largo de los años. Inicialmente, duplicamos el tamaño de nuestro salón original y luego añadimos dos más, triplicando así nuestro espacio comercial. Este crecimiento no solo refleja nuestro éxito, sino también la expansión y desarrollo de nuestra querida Villa Alfredo Fortabat.</p>
                    </section>
                    <section className="about-us-section">
                        <h2>Misión y Visión</h2>
                        <p>Nuestra misión siempre ha sido mantener un contacto cercano y personal con nuestros clientes. Queremos que cada persona que entra a nuestro local o se comunica digitalmente sienta el mismo trato cálido y familiar. Nos enorgullece ofrecer un servicio en el que la confianza y la palabra siguen siendo fundamentales.</p>
                        <p>Mirando hacia el futuro, nuestra visión es renovar nuestro local y expandir nuestra presencia a través de Internet. Queremos llegar a más personas y permitir que más clientes disfruten de nuestros productos, sin importar dónde se encuentren.</p>
                    </section>
                    <section className="about-us-section">
                        <h2>Nuestros Valores</h2>
                        <p>Desde nuestros inicios, hemos mantenido los mismos valores que nuestros fundadores inculcaron: confianza, integridad y un trato personalizado. Creemos en la importancia de resolver cualquier problema que tenga un cliente, asegurándonos de que siempre se vayan satisfechos.</p>
                    </section>
                    <section className="about-us-section">
                        <h2>Generaciones de Liderazgo</h2>
                        <p>Nuestra empresa ha sido guiada por tres generaciones de la familia Lindner:</p>
                        <ul>
                            <li>Primera Generación: Sr. Coronel Mario Lindner y Emilia Antunez Roda.</li>
                            <li>Segunda Generación: Sr. Mario Alberto Lindner y Analia Elisabet Garmendia.</li>
                            <li>Tercera Generación: Matias Alberto Lindner, Martin Damian Lindner y Mario Luis Lindner.</li>
                        </ul>
                    </section>
                    <section className="about-us-section">
                        <h2>Productos y Servicios</h2>
                        <p>Ofrecemos una amplia variedad de productos en diferentes rubros:</p>
                        <ul>
                            <li>Mueblería</li>
                            <li>Electrodomésticos</li>
                            <li>Artículos para el hogar</li>
                            <li>Ropa de blanco</li>
                            <li>Colchones/Sommiers y camas</li>
                            <li>Bicicletas</li>
                            <li>Camping y pesca</li>
                            <li>Celulares</li>
                            <li>Computación</li>
                            <li>Relojería</li>
                        </ul>
                        <p>Nuestra mueblería es el rubro principal, y estamos orgullosos de contar con una mueblería familiar manejada por nuestro tío, Miguel Angel Lindner, quien fabrica muebles a medida con la misma dedicación y calidad que nos ha caracterizado desde el inicio.</p>
                    </section>
                    <section className="about-us-section">
                        <h2>Relación con la Comunidad</h2>
                        <p>Somos una empresa profundamente arraigada en nuestra comunidad. En un pueblo donde todos se conocen, valoramos las relaciones afectivas y recíprocas con nuestros clientes. Este vínculo cercano es la base de nuestra operación diaria.</p>
                    </section>
                    <section className="about-us-section">
                        <h2>Innovación y Futuro</h2>
                        <p>Aunque no hemos implementado grandes innovaciones tecnológicas, siempre hemos renovado nuestro local y nos esforzamos por ofrecer las últimas tecnologías disponibles en el mercado. Nuestro objetivo es convertirnos en una empresa que no solo sirve localmente, sino que también realiza envíos a nivel nacional e internacional a través de Internet.</p>
                    </section>
                    <section className="about-us-section">
                        <h2>Nuestro Orgullo</h2>
                        <p>Uno de nuestros logros más significativos es ser el local más longevo del pueblo, manteniendo siempre el nombre original y a los dueños de la familia Lindner. Este logro es un testimonio de nuestra dedicación y compromiso con la comunidad.</p>
                    </section>
                    <section className="about-us-section">
                        <h2>Testimonios</h2>
                        <blockquote>
                            <p>"En Casa Lindner, siempre me han tratado como parte de la familia. No importa si compro un pequeño electrodoméstico o un mueble a medida, sé que recibiré el mismo trato cercano y personalizado. Confío plenamente en ellos." – Cliente Satisfecho</p>
                        </blockquote>
                    </section>
                </main>
            </div>
            <WhatsAppButton phoneNumber={phoneNumber} />
        </>
    );
} 