import conf from "../../conf/conf.js"
import { Client, Account, ID } from "appwrite";



export class AuthService {
    Client = new Client();
    account;

    constructor() {
        this.Client
         .setEndpoint(conf.appwriteUrl)
         .setProject(conf.appwriteProjectId);
       this.account = new Account(this.Client);
     
    }
    // =====Create User Account
    async createAccount({email, password, name}){

        try {

            const userAccount = await this.account.create(ID.unique(), email,password,name);
            if(userAccount)
            {
                //return userAccount;
                return this.login({email, password});
            }
            else{
                return userAccount;
            }

        } catch (error) {
            throw error;
        }

    }
     //====== user Login 
    async login({email, password}){
        try {
           return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }
    // ======Check Current User Status
    async getCurrentUser() {
        try {
            if (this.account) {
                 const user = await account.get();
            //return await this.account.get();
            } else {
           
            console.error("Account instance not initialized");
            return null;
            }
           return await this.account.get();
           
        } catch (error) {
            throw error;
        }
        return null;
    }
    // =====LogOut
    async logout(){
        try {
            return await this.account.deleteSesstions()
        } catch (error) {
            throw error;
        }
    }



    }

export const authService = new AuthService();

export default authService


