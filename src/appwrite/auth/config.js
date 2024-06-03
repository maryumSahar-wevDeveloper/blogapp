import conf from "../../conf/conf.js"
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class AppService{
    client = new Client()
    databases;
    bucket;

    constructor(){
         this.client
         .setEndpoint(conf.appwriteURl) // Your Appwrite Endpoint
         .setProject(conf.appwriteProjectId) // Your project ID

        
    // this.client
    // .setEndpoint(conf.appwriteUrl) // Your Appwrite Endpoint
    // .setProject(conf.appwriteProjectId) // Your project ID
    // ;
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }

    async createpost({title, slug, content, featuredimg, usedid, status}){
        try {
            return await this.Database.CreateDocument(conf.appwriteDatabaseID, conf.appwriteCollectionId, slug, {
                title,
                content,
                featuredimg,
                status,
                usedid,
            })

        } catch (error) {
            throw error
        }
    }

    async updatePost(slug, {title, content, featuredimg, status}){

        try {
            await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimg,
                    status,
                }
            );
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug){
        try {
            
            await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionId,
                slug
            )
            return true

        } catch (error) {
            throw error;
            return false
        }
    }

    async getPost(slug){
        try {
           return await this.databases.getDocument(
            conf.appwriteDatabaseID,
            conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            throw error;
            return false
        }
    }

    async listPosts(queries = [Query.equal("status", "active")]){
        try {

            await this.databases.listDocument(
                conf.appwriteCollectionId,
                conf.appwriteDatabaseID,
                queries,
            )
            
        } catch (error) {
            throw error;
            return false
        }
    }

    // ======File Upload 

    async uploadFile(file){
        try {
            await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
            return true
        } catch (error) {
            throw error;
            return false
        }
    }
    async deleteFile(fileId){
        try {

            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            throw error;
            return false
        }
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const appService = new AppService()
export default appService
