import conf from "../../conf/conf.js"
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class AppService{
    client = new Client();
    databases;
    bucket;

    constructor(){
         this.Client
        .setEndpoint(conf.appwriteURl)
        .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.Client);
        this.bucket = new Stroge(this.client)
    }

    async createpost({title, slug, content, featuredimg, usedid, status}){
        try {
            return await this.Database.CreateDocument(config.appwriteDatabaseID, config.appwriteCollectionId, slug, {
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
                config.appwriteDatabaseID,
                config.appwriteCollectionId,
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
                config.appwriteDatabaseID,
                config.appwriteCollectionId,
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
                config.appwriteDatabaseID,
                config.appwriteCollectionId,
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
                config.appwriteCollectionId,
                config.appwriteDatabaseID,
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
                config.appwriteBucketId,
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
                config.appwriteBucketId,
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