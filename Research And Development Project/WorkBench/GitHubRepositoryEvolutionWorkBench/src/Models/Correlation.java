package Models;

public class Correlation {
	
	String SeriesAName = "";
	String SeriesBName = "";
	String Pearsons = "";
	String Spearman = "";
	
	public Correlation(String Sa, String Sb, String p){
		this.SeriesAName = Sa;
		this.SeriesBName = Sb;
		this.Pearsons = p;
	}
	
	public String getSeriesAName() {
		return SeriesAName;
	}
	public void setSeriesAName(String seriesAName) {
		SeriesAName = seriesAName;
	}
	public String getSeriesBName() {
		return SeriesBName;
	}
	public void setSeriesBName(String seriesBName) {
		SeriesBName = seriesBName;
	}
	public String getPearsons() {
		return Pearsons;
	}
	public void setPearsons(String pearsons) {
		Pearsons = pearsons;
	}
	public String getSpearman() {
		return Spearman;
	}
	public void setSpearman(String spearman) {
		Spearman = spearman;
	}

}
