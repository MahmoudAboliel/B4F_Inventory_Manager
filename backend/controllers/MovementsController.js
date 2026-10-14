import MovementModel from '../models/MovementModel.js';

export const getAllMovements = async (req, res) => {
  try {
    const movements = await MovementModel.findAll();
    // const range = req.query.range ? JSON.parse(req.query.range) : [0, 9];
    // const sort = req.query.sort ? JSON.parse(req.query.sort) : ['date', 'DESC'];

    // const start = range[0];
    // const end = range[1];
    // const limit = (end - start) + 1;
    // const skip = start;

    // const sortBy = sort[0];
    // const order = sort[1] === 'ASC' ? 1 : -1;

    // const { movements, total } = await MovementModel.findWithPagination(skip, limit, sortBy, order);

    // res.setHeader('Content-Range', `movements ${start}-${end}/${total}`);
    // res.setHeader('Access-Control-Expose-Headers', 'Content-Range');

    res.status(200).json(movements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMovementById = async (req, res) => {
  try {
    const movement = await MovementModel.findById(req.params.id);
    if (!movement) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(movement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createMovement = async (req, res) => {
  try {
    // in future add check if quantity of products is available
    // check if product model have method for add or pull amount in quantity products
    // await Product.updateStock(product_id, amount, processType);
    const movement = await MovementModel.create(req.body);
    res.status(201).json(movement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// export const updateMovement = async (req, res) => {
//   try {
//     const movement = await MovementModel.update(req.params.id, req.body);
//     if (!movement) return res.status(404).json({ message: 'Not found' });
//     res.status(200).json(movement);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// export const deleteMovement = async (req, res) => {
//   try {
//     const movement = await MovementModel.delete(req.params.id);
//     if (!movement) return res.status(404).json({ message: 'Not found' });
//     res.status(200).json({ message: 'Deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };