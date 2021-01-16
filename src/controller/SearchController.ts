import { SearchReqDto } from './../models/SearchReqDto';
import { SearchService } from '../apisService/SearchService';
import { Router, Request, Response, NextFunction } from 'express';

export class SearchController {
    public router: Router = Router();
    public baseUrl: string = '/search';
    private searchService: SearchService;
    constructor() {
        this.initRoutes();
        this.searchService = new SearchService();
    }

    private initRoutes(): void {
        this.router.get('/get-item', this.getItem);
    }

    private getItem = (req: Request, res: Response, next: NextFunction): void => {
        let searchReqDto: SearchReqDto = {
            q: req.body.searchQuery,
            type: req.body.type,
            market: req.body.market,
            limit: req.body.limit,
            offset: req.body.offset,
            include_external: req.body.include_external
        }
        this.searchService.searchItem(req.body.data, searchReqDto)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(500).json(error.data);
        });
    }
}