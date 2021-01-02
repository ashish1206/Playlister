import { Router, NextFunction, Request, Response } from 'express';
import { BrowseService } from "../apisService/BrowseService";

export class BrowseController {
    public baseUrl: string = '/browse';
    private browseService: BrowseService;
    public router: Router = Router()

    constructor() {
        this.initRoutes();
        this.browseService = new BrowseService();
    }
    
    private initRoutes(): void {
        this.router.get('/get-categories', this.getAllCategories);
        this.router.get('/get-category-playlist/:categortId', this.getCategoryPlaylist);
        this.router.get('/get-new-release', this.getNewReleases);
        this.router.get('/get-feature-playlist', this.getFeaturedPlaylists);
    }

    private getAllCategories = (req: Request, res: Response, next: NextFunction) => {
        let params: any = req.query;
        this.browseService.getAllCategories(params)
        .then((data: any) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json(err.data);
        })
    }

    private getCategoryPlaylist = (req: Request, res: Response, next: NextFunction) => {
        let params: any = req.query;
        let categoryId: string = req.params.categortId;
        this.browseService.getCategoryPlaylist(categoryId, params)
        .then((data: any) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json(err.data);
        })
    }

    private getNewReleases = (req: Request, res: Response, next: NextFunction) => {
        let params: any = req.query;
        this.browseService.getNewReleases(params)
        .then((data: any) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json(err.data);
        })
    }

    private getFeaturedPlaylists = (req: Request, res: Response, next: NextFunction) => {
        let params: any = req.query;
        this.browseService.getFeaturedPlaylists(params)
        .then((data: any) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json(err.data);
        })
    }
}