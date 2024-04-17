export const getRouting = (langs, labels, data) => {
  const routes = {
    static: {},
    errors: {},
  };
  const pages = [];

  const pageTemplate = "page";
  const slidesTemplate = "slides";

  const indexPageName = "index";
  const articlesPageName = "articles";
  const articlePageName = "article";
  const blogPageName = "blog";
  const blogPostPageName = "post";
  const coursesPageName = "courses";
  const projectsPageName = "projects";
  const talksPageName = "talks";
  const slidesPageName = "slides";
  const cvPageName = "cv";

  for (let index = langs.length - 1; index >= 0; index--) {
    const lang = langs[index];

    const indexPageUrl = `/${lang}/${indexPageName}`;
    const indexPageId = `${indexPageName}-${lang}`;
    const indexPageObject = {
      template: pageTemplate,
      pageId: indexPageId,
      alts: [`/${lang}`],
    };
    if (index == 0) {
      indexPageObject.alts.push("/");
    }
    routes.static[indexPageUrl] = indexPageObject;
    pages.push({
      id: indexPageId,
      url: indexPageUrl,
      name: indexPageName,
      lang,
      template: pageTemplate,
      type: "home",
    });

    const articlesPageUrl = `/${lang}/${articlesPageName}`;
    const articlesPageId = `${articlesPageName}-${lang}`;
    routes.static[articlesPageUrl] = {
      template: pageTemplate,
      pageId: articlesPageId,
    };
    pages.push({
      id: articlesPageId,
      url: articlesPageUrl,
      name: articlesPageName,
      title: labels[lang].pages.articles.title,
      lang,
      template: pageTemplate,
      type: "list",
      content: data.articles,
    });

    for (let article of data.articles) {
      const articlePageUrl = `/${lang}/${articlePageName}/${parseTitleToUrl(article.title)}`;
      const articlePageId = `${articlePageName}-${lang}-${article.id}`;
      routes.static[articlePageUrl] = {
        template: pageTemplate,
        pageId: articlePageId,
      };
      pages.push({
        id: articlePageId,
        url: articlePageUrl,
        name: articlePageName,
        title: article.title,
        image: article.image,
        lang,
        template: pageTemplate,
        type: "item",
        content: article,
      });
    }

    const blogPageUrl = `/${lang}/${blogPageName}`;
    const blogPageId = `${blogPageName}-${lang}`;
    routes.static[blogPageUrl] = {
      template: pageTemplate,
      pageId: blogPageId,
    };
    pages.push({
      id: blogPageId,
      url: blogPageUrl,
      name: blogPageName,
      title: labels[lang].pages.blog.title,
      lang,
      template: pageTemplate,
      type: "list",
      content: data.blog,
    });

    for (let post of data.blog) {
      const blogPostPageUrl = `/${lang}/${blogPostPageName}/${parseTitleToUrl(post.title)}`;
      const blogPostPageId = `${blogPostPageName}-${lang}-${post.id}`;
      routes.static[blogPostPageUrl] = {
        template: pageTemplate,
        pageId: blogPostPageId,
      };
      pages.push({
        id: blogPostPageId,
        url: blogPostPageUrl,
        name: blogPostPageName,
        title: post.title,
        image: post.image,
        lang,
        template: pageTemplate,
        type: "item",
        content: post,
      });
    }

    const coursesPageUrl = `/${lang}/${coursesPageName}`;
    const coursesPageId = `${coursesPageName}-${lang}`;
    routes.static[coursesPageUrl] = {
      template: pageTemplate,
      pageId: coursesPageId,
    };
    pages.push({
      id: coursesPageId,
      url: coursesPageUrl,
      name: coursesPageName,
      title: labels[lang].pages.courses.title,
      lang,
      template: pageTemplate,
      type: "list",
      content: data.courses,
    });

    const projectsPageUrl = `/${lang}/${projectsPageName}`;
    const projectsPageId = `${projectsPageName}-${lang}`;
    routes.static[projectsPageUrl] = {
      template: pageTemplate,
      pageId: projectsPageId,
    };
    pages.push({
      id: projectsPageId,
      url: projectsPageUrl,
      name: projectsPageName,
      title: labels[lang].pages.projects.title,
      lang,
      template: pageTemplate,
      type: "list",
      content: data.projects,
    });

    const talksPageUrl = `/${lang}/${talksPageName}`;
    const talksPageId = `${talksPageName}-${lang}`;
    routes.static[talksPageUrl] = {
      template: pageTemplate,
      pageId: talksPageId,
    };
    pages.push({
      id: talksPageId,
      url: talksPageUrl,
      name: talksPageName,
      title: labels[lang].pages.talks.title,
      lang,
      template: pageTemplate,
      type: "list",
      content: data.talks,
    });

    const cvPageUrl = `/${lang}/${cvPageName}`;
    const cvPageId = `${cvPageName}-${lang}`;
    routes.static[cvPageUrl] = {
      template: pageTemplate,
      pageId: cvPageId,
    };
    pages.push({
      id: cvPageId,
      url: cvPageUrl,
      name: cvPageName,
      title: labels[lang].pages.cv.title,
      lang,
      template: pageTemplate,
      type: "cv",
      content: data.cv,
    });

    for (let error of ["404", "500"]) {
      const errorPageId = `${error}-${lang}`;
      routes.errors[errorPageId] = {
        template: pageTemplate,
        statusCode: error,
        scope: index == 0 ? "/" : `/${lang}/`,
      };
      pages.push({
        id: errorPageId,
        name: error,
        title: labels[lang].pages.error[error].name,
        lang,
        template: pageTemplate,
        type: "error",
      });
    }
  }

  for (let slides of data.slides) {
    const slidesPageUrl = `/${slidesPageName}/${parseTitleToUrl(slides.title)}`;
    if (slides.html) {
      const slidesPageId = `${slidesPageName}-${slides.id}`;
      routes.static[slidesPageUrl] = {
        template: slidesTemplate,
        pageId: slidesPageId,
      };
      pages.push({
        id: slidesPageId,
        url: slidesPageUrl,
        name: slidesPageName,
        title: slides.title,
        image: slides.image,
        template: slidesTemplate,
        type: "slides",
        content: slides,
      });
    }
  }

  for (let route in routes.static) {
    if (Object.hasOwn(routes.static[route], "template")) {
      routes.static[route].template =
        `${routes.static[route].template}.template.html`;
    }
    if (!route.endsWith("/")) {
      routes.static[`${route}/`] = { ...routes.static[route] };
    }
  }
  for (let errorId in routes.errors) {
    if (Object.hasOwn(routes.errors[errorId], "template")) {
      routes.errors[errorId].template =
        `${routes.errors[errorId].template}.template.html`;
    }
  }

  return { routes, pages };
};

const parseTitleToUrl = (title) =>
  title
    ? title
        .trim()
        .toLowerCase()
        .replaceAll(new RegExp("[^a-zA-Z0-9]", "g"), "-")
    : title;
