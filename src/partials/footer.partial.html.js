const footer = (data, dists, { lang, type }) =>
  `<footer>
    <section id="contact">
      <div class="wrapper">
        <article>
          ${
            type === "home"
              ? `<h2>${data.labels[lang].pages.home.contact.head}</h2>
                <div>
                  <ul>
                    <li><h3 class="architect-fg">Architecture offer?</h3></li>
                    <li><h3 class="developer-fg">Development offer?</h3></li>
                    <li><h3 class="leader-fg">Leadership offer?</h3></li>
                    <li><h3 class="teacher-fg">Teachingship offer?</h3></li>
                  </ul>
                  <a href="mailto:j@swn.ski"><h3 id="contact-mail">j[at]swn.ski</h3></a>
                </div>`
              : ""
          }
          <p>
            <a href="mailto:j@swn.ski">j[at]swn.ski</a>
            | <a href="https://linkedin.com/in/jakub-sowi%C5%84ski/" target="_blank">linkedin</a>
            | <a href="https://github.com/soofka/" target="_blank">github</a>
            | <a href="https://last.fm/user/soofka/" target="_blank">last.fm</a>
          </p>
          <p><small>
            swn.ski 2007-2024
            | <a href="https://europa.eu/youreurope/business/running-business/intellectual-property/copyright/index_en.htm" target="_blank">${data.labels[lang].misc.allRightsReserved}</a>
            | <a href="https://github.com/soofka/swn.ski">repo</a>
          </small></p>
        </article>
      </div>
    </section>
  </footer>
`;

export default footer;