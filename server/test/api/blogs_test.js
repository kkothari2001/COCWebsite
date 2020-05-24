const Blog = require("../../src/models/Blog");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const app = require("../../src/app");

chai.use(chaiHttp);

describe("Blogs", () => {
  afterEach((done) => {
    Blog.remove().then(() => {
      done();
    });
  });

  describe("/GET blogs", () => {
    it("should return all blogs", (done) => {
      chai
        .request(app)
        .get("/api/blogs")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });

  describe("/GET/:id Blog", () => {
    let blog;

    it("should return a single blog if id is correct", (done) => {
      blog = new Blog({
        blogTitle: "Test blog title",
        blogContent: "Test blog content",
        author: "Test blog author",
      });
      blog.save((err, blog) => {
        chai
          .request(app)
          .get("/api/blogs/" + blog._id)
          .send(blog)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("blogTitle").eql("Test blog title");
            res.body.should.have
              .property("blogContent")
              .eql("Test blog content");
            res.body.should.have.property("author").eql("Test blog author");
            res.body.should.have.property("date").not.eql(null);
            done();
          });
      });
    });
  });

  describe("/POST blogs", () => {
    it("creates blog if data is sent", (done) => {
      let blog = {
        blogTitle: "Test post blog title",
        blogContent: "Test post blog content",
        author: "Test post blog author",
      };

      chai
        .request(app)
        .post("/api/blogs/new")
        .send(blog)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("id");
          done();
        });
    });
  });

  describe("PUT/:id blogs", () => {
    it("updates blog with given id", (done) => {
      let blog = {
        blogTitle: "Test blog title",
        blogContent: "Test blog content",
        author: "Test blog author",
      };
      let updatedBlog = {
        blogTitle: "Test put blog title",
        blogContent: "Test put blog content",
        author: "Test put blog author",
      };
      let newBlog = new Blog(blog);
      newBlog.save((err, blog) => {
        chai
          .request(app)
          .put("/api/blogs/edit/" + blog._id)
          .send(updatedBlog)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("id");
            done();
          });
      });
    });
  });

  describe("DELETE/:id blogs", () => {
    it("should delete blog with given id", (done) => {
      let blog = {
        blogTitle: "Test blog title",
        blogContent: "Test blog content",
        author: "Test blog author",
      };
      let newBlog = new Blog(blog);
      newBlog.save((err, blog) => {
        chai
          .request(app)
          .delete("/api/blogs/delete/" + blog._id)
          .end((err, res) => {
            res.should.have.status(204);
            done();
          });
      });
    });
  });
});
