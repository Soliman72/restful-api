import {z , AnyZodObject} from 'zod';
import express from 'express';

// build our schema 
export const userSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'user must have a name'
    }).min(3, 'name is very small !!'),
    password: z.string({
      required_error: 'user must have a password'
    }).min(6, 'password is very small !!'),
    email: z.string({
      required_error: 'user must have a email'
    }).email('provide a valid email!')
  })
});

export const sessionSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email is required'
    }).email('provide a valid email'),
    password: z.string({
      required_error: 'password is required'
    }).min(6, 'password is very small')
  })
});

export const productSchema = z.object({
  body: z.object({
    title: z.string({
      required_error : 'title is required',
    }),
    description: z.string({
        required_error: 'description is required',
      }
    ),
    price: z.number({
        required_error: 'price is required',
      }
    ),
  })
})

// we need to import NextFunction from Express and AnyZodObject from Zod

export const validate = (schema: AnyZodObject) => 
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query
      });
      next();
    } catch (error) {
      return res.status(400).json(error);
    }
  }
