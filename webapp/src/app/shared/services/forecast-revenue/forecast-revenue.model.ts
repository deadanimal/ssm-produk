export class ForecastRevenue {
    public id: string
    public target_year: string
    public target_jan: string
    public target_feb: string
    public target_mar: boolean
    public target_apr: boolean
    public target_may: number
    public target_jun: number
    public target_jul: string
    public target_aug: string
    public target_sep: number
    public target_oct: string
    public target_nov: string
    public target_dec: string
    public created_by: string
    public created_date: string
    public modified_date: string

    constructor(
        id: string,
        target_year: string,
        target_jan: string,
        target_feb: string,
        target_mar: boolean,
        target_apr: boolean,
        target_may: number,
        target_jun: number,
        target_jul: string,
        target_aug: string,
        target_sep: number,
        target_oct: string,
        target_nov: string,
        target_dec: string,
        created_by: string,
        created_date: string,
        modified_date: string
    ) {
        this.id = id
        this.target_year = target_year
        this.target_jan = target_jan
        this.target_feb = target_feb
        this.target_mar = target_mar
        this.target_apr = target_apr
        this.target_may = target_may
        this.target_jun = target_jun
        this.target_jul = target_jul
        this.target_aug = target_aug
        this.target_sep = target_sep
        this.target_oct = target_oct
        this.target_nov = target_nov
        this.target_dec = target_dec
        this.created_by = created_by
        this.created_date = created_date
        this.modified_date = modified_date
    }
}