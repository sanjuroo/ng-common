//TODO - rework comments to JSDOC

/**
 * Class for paging evaluation
 */
export class Paginator
{
    //######################### private fields ######################### 

    /**
     * First page set to paginator
     */
    private _base: number = 1;

    /**
     * Number of items per page
     */
    private _itemsPerPage: number = 10;

    /**
     * Index of current page
     */
    private _page: number = 1;

    /**
     * Number of all items to be used for counting paging
     */
    private _itemCount: number;

    //######################### public methods #########################

    /// <summary>
    /// Sets current page number.
    /// </summary>
    /// <param name="page">Page number</param>
    /// <returns><see cref="Paginator"/> provides a fluent interface</returns>
    public SetPage(page: number): Paginator
    {
        this._page = page;

        return this;
    }

    /// <summary>
    /// Returns current page number.
    /// </summary>
    /// <returns>Current page number</returns>
    public GetPage(): number
    {
        return this._base + this.GetPageIndex();
    }

    /// <summary>
    /// Returns first page number.
    /// </summary>
    /// <returns>Number of first page</returns>
    public GetFirstPage(): number
    {
        return this._base;
    }

    /// <summary>
    /// Returns last page number.
    /// </summary>
    /// <returns>Number of last page</returns>
    public GetLastPage(): number
    {
        return this._base + Math.max(0, this.GetPageCount() - 1);
    }

    /// <summary>
    /// Sets first page (_base) number.
    /// </summary>
    /// <param name="baseVal">Index of base page</param>
    /// <returns><see cref="Paginator"/> provides a fluent interface</returns>
    public SetBase(baseVal: number): Paginator
    {
        this._base = baseVal;

        return this;
    }

    /// <summary>
    /// Returns first page (_base) number.
    /// </summary>
    /// <returns>Index of base page</returns>
    public GetBase(): number
    {
        return this._base;
    }

    /// <summary>
    /// Gets indication whether is the current page the first one?
    /// </summary>
    /// <returns>True if current page is first one</returns>
    public IsFirst(): boolean
    {
        return this.GetPageIndex() == 0;
    }

    /// <summary>
    /// Gets indication whether is the current page the last one?
    /// </summary>
    /// <returns>True if current page is last one, otherwise false</returns>
    public IsLast(): boolean
    {
        return this.GetPageIndex() == (this.GetPageCount() - 1);
    }

    /// <summary>
    /// Returns the total number of pages.
    /// </summary>
    /// <returns>Total number of pages</returns>
    public GetPageCount(): number
    {
        return Math.ceil(this._itemCount / this._itemsPerPage);
    }

    /// <summary>
    /// Sets the number of items to display on a single page.
    /// </summary>
    /// <param name="itemsPerPage">Number of items per page</param>
    /// <returns><see cref="Paginator"/> provides a fluent interface</returns>
    public SetItemsPerPage(itemsPerPage: number): Paginator
    {
        this._itemsPerPage = Math.max(1, itemsPerPage);
        
        return this;
    }

    /// <summary>
    /// Returns the number of items to display on a single page.
    /// </summary>
    /// <returns>Number of items per one page</returns>
    public GetItemsPerPage(): number
    {
        return this._itemsPerPage;
    }

    /// <summary>
    /// Sets the total number of items.
    /// </summary>
    /// <param name="itemCount">Count of items or -1 for infinity</param>
    /// <returns><see cref="Paginator"/> provides a fluent interface</returns>
    public SetItemCount(itemCount: number): Paginator
    {
        this._itemCount = itemCount == -1 ? Number.MAX_VALUE : Math.max(0, itemCount);

        return this;
    }

    /// <summary>
    /// Returns the total number of items.
    /// </summary>
    /// <returns>Total number of items</returns>
    public GetItemCount(): number
    {
        return this._itemCount;
    }

    /// <summary>
    /// Returns the absolute index of the first item on current page.
    /// </summary>
    /// <returns>Absolute index of first item</returns>
    public GetOffset(): number
    {
        return this.GetPageIndex() * this._itemsPerPage;
    }

    /// <summary>
    /// Returns the absolute index of the first item on current page in countdown paging.
    /// </summary>
    /// <returns>Countdown offset of first item</returns>
    public GetCountdownOffset(): number
    {
        return Math.max(0, this._itemCount - (this.GetPageIndex() + 1) * this._itemsPerPage);
    }

    /// <summary>
    /// Returns the number of items on current page.
    /// </summary>
    /// <returns>Number of items on page</returns>
    public GetLength(): number
    {
        return Math.min(this._itemsPerPage, this._itemCount - this.GetPageIndex() * this._itemsPerPage);
    }

    /// <summary>
    /// Gets list of page numbers with specified dispersion
    /// </summary>
    /// <param name="dispersion">Number identifying dispersion</param>
    /// <returns>Page numbers according specified dispersion</returns>
    public GetPagesWithDispersion(dispersion: number): number[]
    {
        var currentPage = this.GetPage();
        var pageCount = this.GetPageCount();
        var numberOfPages = Math.min(pageCount, Math.max(0, dispersion) * 2 + 1) - 1;
        var startingPage = Math.max(this._base, currentPage - dispersion);

        if ((currentPage + dispersion) > pageCount)
        {
            startingPage = pageCount - numberOfPages;
        }

        var x, endingPage = startingPage + numberOfPages;
        var result: number[] = [];

        for (x = startingPage; x <= endingPage; x++)
        {
            result.push(x);
        }
        
        return result;
    }

    /// <summary>
    /// Gets list of page numbers with specified dispersion, pages are trimmed if current page is near beginning or end
    /// </summary>
    /// <param name="dispersion">Number identifying dispersion</param>
    /// <returns>Page numbers according specified dispersion</returns>
    public GetPagesWithTrimDispersion(dispersion: number): number[]
    {
        var currentPage = this.GetPage();
        var lastPage = this.GetLastPage();
        var startingPage = Math.max(this._base, currentPage - dispersion);
        var x, endingPage = Math.min(lastPage, currentPage + dispersion);

        var result: number[] = [];
        
        for (x = startingPage; x <= endingPage; x++)
        {
            result.push(x);
        }
        
        return result;
    }

    /// <summary>
    /// Gets list of page numbers generated with uniform distribution
    /// </summary>
    /// <param name="numberOfPages">Number of pages that are going to be uniformly distributed between first and last page (including)</param>
    /// <returns>Uniformly distributed page numbers</returns>
    public GetPagesWithUniformDistribution(numberOfPages: number): number[]
    {
        numberOfPages = Math.max(1, numberOfPages - 1);
        var pageCount = this.GetPageCount();
        numberOfPages = Math.min(numberOfPages, pageCount - 1);
        var step = pageCount / numberOfPages;
        var page = this.GetFirstPage();
        var x;

        var result: number[] = [];

        for (x = 0; x < numberOfPages; x++)
        {
            result.push(Math.round(page));

            page += step;
        }

        result.push(pageCount);
        
        return result;
    }

    //######################### protected methods #########################

    /// <summary>
    /// Returns zero-_based page number.
    /// </summary>
    /// <returns>Zero-_based page number</returns>
    protected GetPageIndex(): number
    {
        return Math.min(Math.max(0, this._page - this._base), Math.max(0, this.GetPageCount() - 1));
    }
}