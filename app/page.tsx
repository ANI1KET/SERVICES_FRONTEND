// import UpperLayout from "./components/HomeLayouts/UpperLayout";
// import LowerLayout from "./components/HomeLayouts/LowerLayout";
// import MiddleLayout from "./components/HomeLayouts/MiddleLayout";

"use client";

import useBreakpoint from "@/app/utils/useBreakpoint";
import UpperSearchBox from "./components/HomeLayouts/UpperLayout/UpperSearchBox";
import LowerSearchBox from "./components/HomeLayouts/UpperLayout/LowerSearchBox";

const Home: React.FC = () => {
  const { isMobile } = useBreakpoint();

  return (
    <main className=" ">
      {/* <UpperLayout />
      <MiddleLayout />
      <LowerLayout /> */}
      <section className={`h-[55vh] bg-red-500 `}></section>

      {!isMobile && (
        <div className="bg-green-500 h-[12vh] w-3/4 mx-auto rounded-3xl shadow-2xl drop-shadow-xl sticky top-[7vh] ">
          <UpperSearchBox />
          <hr />
          <LowerSearchBox />
        </div>
      )}

      {isMobile && (
        <nav className="h-[16vh] top-[47%] fixed right-0 rounded-s-3xl shadow-2xl drop-shadow-xl flex flex-col justify-around items-center p-2 bg-green-500 ">
          <div>RENT</div>
          <div>BUY</div>
          <div>SHOP</div>
        </nav>
      )}

      <section className="bg-yellow-500 ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem sequi
        cupiditate vero explicabo odit, dignissimos iste accusantium saepe,
        inventore repellat omnis voluptates aliquam, rerum neque quos labore!
        Non repudiandae natus ipsa eveniet reiciendis, ea tenetur et vel
        maiores? Mollitia ut quidem aliquam dolorum ipsam a eum similique. Non
        sint, eum optio, eaque aliquid fugiat quod ex a corrupti ipsam beatae
        nesciunt recusandae facere assumenda? Molestiae voluptates id et beatae
        suscipit sequi, repelex vero recusandae est ob Lorem ipsum dolor sit
        amet, consectetur adipisicing elit. Adipisci provident odit quia rerum.
        Voluptatibus soluta sequi facilis quod deleniti, aspernatur dolorum
        explicabo aliquid nemo officia doloremque cupiditate fuga repellat,
        voluptates nihil consectetur hic commodi dolorem a esse. Nulla possimus
        distinctio, ex optio repellat quidem! Impedit voluptatem et ducimus
        beatae fugiat.caecati facilis qui praesentium, voluptatibus reiciendis
        expedita dolores quibusdam distinctio aliquid autem nihil esse. Quidem,
        neque iure? Architecto inventore, laboriosam sapiente tempore aperiam
        maxime, optio beatae ea doloribus earum tempora autem, et consequatur.
        Mollitia, accusamus, nemo necessitatibus quae est aliquam amet autem
        omnis expedita exercitationem architecto ducimus voluptates quam, esse
        sapiente magnam suscipit eveniet! Itaque repudiandae accusantium eum quo
        ducimus quisquam voluptates illum est magnam? Labore, deserunt! Error
        vero sint accusamus eos voluptatum nulla vitae quis ad pariatur
        asperiores similique inventore ipsa dicta voluptatem natus temporibus
        ratione quam, tempore minus non autem optio voluptate sunt unde! Vel
        accusantium, rerum quas non ullam dolorum. Autem repellendus totam nisi
        numquam ipsum sapiente aspernatur quo, mollitia praesentium quidem eius
        a tempore magnam delectus quis illo adipisci eveniet! Excepturi esse ad
        saepe ipsa omnis magni cum facilis vitae nulla perferendis cupiditate
        corrupti voluptatibus rerum assumenda perspiciatis ab animi tenetur,
        earum quam obcaecati! Enim fugiat rem consequatur quisquam reiciendis
        quo voluptatum corrupti corporis. Similique libero vero omnis eos,
        explicabo, accusamus incidunt fuga ratione excepturi, quae atque
        aspernatur veniam dignissimos neque voluptatibus corrupti. Veritatis,
        eaque incidunt cumque ea quod, eos sequi esse tempore consequuntur,
        perspiciatis impedit obcaecati! Accusamus, quas quos provident velit
        temporibus, natus quasi consequatur excepturi porro ut, perspiciatis
        eligendi nulla! A, ut quos maiores voluptate perspiciatis natus nisi
        obcaecati? Eligendi voluptatibus itaque expedita vitae et eveniet rem
        eaque enim impedit dicta, iste modi architecto ratione maxime
        repellendus aliquam illum debitis ipsa natus voluptatum. Ipsa
        consequatur porro hic recusandae quidem incidunt perspiciatis vero est
        non temporibus veritatis nostrum et optio ut molestias obcaecati, quos
        laudantium autem quaerat! Voluptas praesentium quasi ab suscipit minima
        beatae et asperiores ad, facere architecto. Necessitatibus, praesentium
        aut fuga architecto natus excepturi hic in omnis id perspiciatis animi
        similique modi reiciendis cupiditate suscipit asperiores atque est saepe
        non laboriosam adipisci! Assumenda ex eius laudantium quod! Tenetur
        magnam error rem aliquid praesentium? Earum, quisquam assumenda delectus
        eius veritatis corrupti ullam soluta odit laudantium, repellendus totam,
        itaque temporibus dolorem quos aliquam similique commodi quas
        dignissimos? Accusantium at labore, voluptates hic ex, aliquid
        consequuntur explicabo veritatis dolorem nisi repellendus, animi
        laboriosam repellat laborum libero! Laudantium, officia ratione
        reiciendis quibusdam rem veritatis quo dolorum a provident perferendis
        dignissimos, iusto possimus odit unde alias quam aspernatur assumenda
        temporibus porro est, eaque facere ex doloribus totam! A necessitatibus
        saepe quidem nisi vel provident est eos sed accusantium et! Adipisci
        beatae eum quae facere officiis provident a non, distinctio excepturi
        aperiam atque, magnam consectetur dignissimos, reprehenderit maiores aut
        dolore molestias blanditiis? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Rerum neque eveniet aut eligendi saepe enim, laborum
        nihil porro, maxime repudiandae incidunt eaque error quisquam earum
        labore delectus architecto ducimus unde beatae temporibus iusto id eos
        blanditiis. Aspernatur laborum dolores aut, laudantium repellat aliquam
        facilis eaque quo nisi, quidem consectetur corporis ab ullam libero odio
        possimus soluta molestiae repudiandae necessitatibus nam quia
        laboriosam. Nesciunt reiciendis, laborum nobis delectus error, cumque
        veritatis reprehenderit quaerat ipsam nulla libero beatae, facilis
        doloribus rem modi. Maiores nam fugiat maxime officia cumque rerum enim
        nulla adipisci id vero accusantium ratione sit nemo recusandae
        doloremque ab dolorum inventore praesentium, quis necessitatibus
        deleniti. Quas odit, saepe dicta, quisquam, ipsum iusto beatae ratione
        similique dolorem dignissimos voluptate fugit dolore ut quia minus!
        Veritatis temporibus velit esse accusamus perspiciatis, error
        reprehenderit voluptates, atque nesciunt debitis veniam voluptate. Sequi
        saepe necessitatibus eaque, odit iusto soluta fuga quasi aliquid
        eligendi, molestias magnam? Adipisci quos sunt harum amet provident quas
        eaque possimus, numquam veniam assumenda deserunt facilis modi
        blanditiis. Quasi veritatis voluptatibus quod nam, perspiciatis cum illo
        saepe praesentium eveniet at placeat numquam ipsam doloremque officiis.
        Sequi, dolore obcaecati aut dolorum velit sapiente! Repellendus amet non
        deserunt accusantium iure dignissimos optio quo, quis aut reiciendis
        dolorem quibusdam distinctio error architecto molestias explicabo!
        Reprehenderit ipsam eligendi iure ullam quam, veniam doloremque
        distinctio repellat officia vero perferendis aspernatur nisi dolore
        laboriosam alias corrupti totam eveniet, molestias aliquid mollitia.
        Dolorum recusandae adipisci, delectus natus voluptatibus aspernatur
        error voluptas facilis odio aliquam inventore quod esse provident culpa.
        Nemo aliquam, quidem, sint incidunt qui ipsa iure porro iste autem
        voluptate sed doloremque perferendis nulla cum asperiores nam alias.
        Quas sit reprehenderit sequi, fugiat molestias at, commodi quia
        aspernatur nisi distinctio iusto dolorum officiis rerum beatae veniam
        saepe alias vel accusamus provident voluptates! Eveniet esse eos nulla
        eum suscipit alias illo mollitia ullam autem quam voluptas unde quo
        aspernatur eius, corporis facilis obcaecati provident quidem nemo natus.
        Officia, voluptas ad iusto molestias velit ut esse vitae quae fuga
        saepe, harum architecto aperiam tenetur error autem voluptatum ipsa
        debitis. Libero, vero! Nemo consectetur ea distinctio corporis et?
        Rerum, rem. Fugiat eaque natus, minima quod recusandae accusantium amet
        temporibus veniam impedit eveniet nemo aliquam, iusto est saepe
        voluptatem officiis velit totam delectus fuga, itaque dolore eius. Dolor
        quidem id rerum asperiores, sapiente qui distinctio reiciendis! Illo
        sequi incidunt libero officiis accusamus, pariatur totam veniam voluptas
        omnis corrupti consequatur repudiandae dignissimos optio earum dicta
        dolores molestias id quos ratione, amet numquam quisquam. Itaque maxime
        corrupti officiis sequi quaerat facere, nemo odio possimus quos hic quis
        nisi placeat. Expedita nobis placeat architecto laborum perspiciatis
        nemo modi! Impedit, provident, earum, alias et ipsam qui veniam
        assumenda odit minus nam molestiae? Quisquam sint architecto modi
        dolores eaque ipsam, iure sequi pariatur. Unde est temporibus id
        expedita corporis sequi veritatis architecto sed ex, ut ullam recusandae
        ratione autem, perspiciatis commodi quo magnam saepe dicta quasi eos
        rem. Commodi cupiditate voluptatem a modi nisi, aut ipsam asperiores ad?
        Exercitationem sint veritatis sed quae ea eligendi ducimus optio?
      </section>
    </main>
  );
};

export default Home;
