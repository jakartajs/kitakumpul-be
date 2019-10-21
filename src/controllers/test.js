class testControlller {
  constructor(router){
    this.index = this.index.bind(this);
    router.get('/', this.index);
  };
  /**
   * @swagger
   * /api/test:
   *   get:
   *     description: Sample API Doc
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: success
   */
  async index(req, res) {
    return res.status(200)
      .json({
        message: 'you access test router'
      });
  }
};


module.exports =  (router) => new testControlller(router);