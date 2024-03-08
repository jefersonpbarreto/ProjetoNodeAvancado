import { Request, Response } from "express";
import UserService from "../services/UserService";
import { UserIn, UserOut } from "../models/UserTypes";
import { User as UserOutput, UserInsert } from "../models/User";



class UserController {

    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async listAllUsers (req: Request, res: Response){

        const queryRequest: {} = await req.query;

        if(Object.keys(queryRequest).length === 0){

            const UsersList = await this.userService.selectAll();
            
            console.log(UsersList);
            
            res.json(UsersList).status(200);
        }else{
            const UserList = await UserService.selectWithFilters(queryRequest);
            console.log(UserList);

            res.json(UserList).status(200);
            
        }
      
    };

    async listUserById (req: Request, res: Response){

        const id = await req.params.id;

        const listId = await this.userService.selectById(Number(id));

        res.json(listId).status(200);
    };

    async createNewUser(req: Request, res: Response){   

        const newUser = new UserInsert(req.body.name, req.body.email)   
    
        
       const create = await this.userService.insertItem(newUser.toObject());

        res.send('Usuário criado com sucesso.').status(201);
    };

    async updateUser(req: Request, res: Response){
        const id = await req.params.id;

        const newUser = new UserInsert(req.body.name, req.body.email) 

        this.userService.updateItem(Number(id), newUser.toObject())
        res.send('Usuário atualizado com sucesso.').status(204);
    };

    async deleteUser(req: Request, res: Response){
        const id = await req.params.id;

        this.userService.deleteItem(Number(id))
        res.send('Usuário deletado com sucesso.').status(204);
    };
}


export default UserController