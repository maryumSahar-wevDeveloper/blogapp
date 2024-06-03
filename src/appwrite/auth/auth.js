import conf from "../../conf/conf.js"
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {

        this.client
        .setEndpoint(conf.appwriteURl) 
        .setProject(conf.appwriteProjectId) 

       this.account = new Account(this.client);
     
    }
    // =====Create User Account
    async createAccount({email, password, name}){

        try {

            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount)
            {
                //return userAccount;
                return this.login({ email, password });
            }
            else{
                return userAccount;
            }

        } catch (error) {
            throw error;
        }

    }
     //====== user Login 
     async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }
    // ======Check Current User Status
 

    async getCurrentUser() {
           try {
            return await this.account.get();
          } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
            }

        return null;
    }


    // =====LogOut
    async logout(){
        try {
            return await this.account.deleteSesstions('current')
        } catch (error) {
            throw error;
        }
    }



    }

export const authService = new AuthService();

export default authService


