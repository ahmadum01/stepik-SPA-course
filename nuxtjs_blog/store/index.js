export const state = () => ({
    posts: [],
    total: [],
    next: [],
    previous: [],
    current_page: 0
  })
  
  export const mutations = {
    SET_POSTS (state, posts) {
      state.posts = posts
    },
    SET_TOTAL (state, total) {
      state.total = total
    },
    SET_NEXT (state, next) {
      state.next = next
    },
    SET_PREVIOUS (state, previous) {
      state.previous = previous
    },
    SET_CURRENT_PAGE (state, current_page) {
      state.current_page = current_page
    },
  }
  
  export const actions = {
    async loadAllPosts() {
      let page = route.query.page !== undefined ? `?page=${route.query.page}` : '';
      const { data } = await axios.get(`http://127.0.0.1:8000/api/posts/${page}`);
      let next = data.next != null ? data.next.split('/')[5] : data.next;
      let previous = data.previous != null ? data.previous.split('/')[5] : data.previous;
      let current_page = route.query.page
      return {
        posts: data.results,
        total: Math.ceil(data.count / 6),
        next: next,
        previous: previous,
        current_page: Number(current_page)
      }
    }
  }