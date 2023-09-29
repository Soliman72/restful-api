import express from 'express';
import Product from './../model/productModel';

export const createProduct = async(
  req: express.Request,
  res : express.Response
) => {
  try {
      // check body
  if (!req.body){
    return res.status(401).json({ msg: 'write the product info to create it !' });
  }
  
  const userId = res.locals.user._id;
  // create product 
  const product = await Product.create({
    user: userId,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    // image: req.body.image,
  });

  res.status(201).json({
    status: 'success',
    product,
  });
  } catch (e) {
    res.status(404).json(e);
  }
}

export const findProduct = async(
  req: express.Request,
  res : express.Response
) => {
  const productId = req.params.productId;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ msg: 'not found this product ' });
  }

  res.status(200).json({
    status: 'success',
    product,
  })
}

export const UpdateProduct = async(
  req: express.Request,
  res : express.Response
) => {
    // get session and user id 
    const productId = req.params.productId;
    const userId = res.locals.user._id;
  
    // check if user is owner the product or not 
    const product = await Product.findById(productId);
    
    if (!(product.user?.toString()  === userId.toString())) {
      return res.status(404).json({
        status: 'fail',
        msg : 'you not the owner this product to updated it ! '
      })
    }
  
    // update product => set valid : false 
    const newProduct = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
      runValidators: true,
    });
  
    res.status(200).json({
      status: 'success',
      newProduct,
    })
}

export const DeleteProduct = async(
  req: express.Request,
  res : express.Response
) => {
      // get session and user id 
      const productId = req.params.productId;
      const userId = res.locals.user._id;
    
      // check if user is owner the product or not 
      const product = await Product.findById(productId);
      
      if (!(product.user?.toString()  === userId.toString())) {
        return res.status(404).json({
          status: 'fail',
          msg : 'you not the owner this product to deleted it ! '
        })
      }
    
      // update product => set valid : false 
      const newProduct = await Product.findByIdAndDelete(productId);
    
      res.status(200).json({
        status: 'success',
        product : 'deleted'
      })
}