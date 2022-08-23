<template>
  <Layout>
      <content-header
        :title="$static.metadata.siteName"
        :sub="$static.metadata.siteDescription"
        :image="randomImage()">
      </content-header>

      <div class="container mx-auto">
          <div class="flex flex-wrap my-4">
          <FeaturedCard v-if="$page.featured.totalCount>0" :records="$page.featured.edges"/>
          <CardItem v-for="edge in $page.entries.edges" :key="edge.node.id" :record="edge.node" />
        </div>
      </div>
  </Layout>
</template>

<page-query>
  query($page: Int) {
    featured: allBlog(limit: 4, filter: { featured: { eq: true } }, sortBy:"created") {
      totalCount
      edges {
        node {
          id
          title
          image(width: 800)
          path
          timeToRead
          humanTime: created(format: "DD/MM/YYYY")
          datetime: created
          category {
            id
            title
            path
          }
          author {
            id
            name
            image(width: 64, height: 64, fit: inside)
            path
          }
        }
      }
    }
    entries: allBlog(perPage: 24, page: $page, sortBy:"created") @paginate {
      totalCount
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
          id
          title
          image(width: 800)
          path
          timeToRead
          featured
          humanTime: created(format: "DD/MM/YYYY")
          datetime: created
          category {
            id
            title
            path
          }
          author {
            id
            name
            image(width: 64, height: 64, fit: inside)
            path
          }
        }
      }
    }
  }
</page-query>

<static-query>
query {
  metadata {
    siteName
    siteDescription
  }
}
</static-query>

<script>
import CardItem from "~/components/Content/CardItem.vue";
import FeaturedCard from "~/components/Content/FeaturedCard.vue";
import ContentHeader from "~/components/Partials/ContentHeader.vue";


export default {
  metaInfo: {
    title: "Irrelevant Subject"
  },
  components: {
    CardItem,
    FeaturedCard,
    ContentHeader
  },
  data() {
    return {
      images:['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg',
        '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg',
        '15.jpg', '16.jpg'
      ],
    };
  },
  methods: {
    randomImage() {
      return `${
          this.images[Math.floor(Math.random() * this.images.length)]
      }`;
    },
  },
};
</script>
