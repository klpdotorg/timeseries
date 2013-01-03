-- Prior to runnning these queries make sure the destination folder is appropriate exists and has permissions for postgres user to write into. Run the queries.sql file using "sudo -u postgres psql -d sslcdata -f queries.sql"
-- Query to get basic govt vs. pvt pass percentage

COPY (select * from tb_agg_mgmt_acadyr) TO '/home/megha/misc/sslc_mgmt/govt_vs_non.csv' WITH  DELIMITER '|' CSV HEADER;
COPY (select '2004-2005' as acad_year, dist_code, "04_05g" as govt_pass, "04_05n" as pvt_pass from tb_agg_mgmt_acadyr) TO '/home/megha/misc/sslc_mgmt/data04-05_aggregate.csv' WITH  DELIMITER '|' CSV HEADER;
COPY (select '2005-2006' as acad_year, dist_code, "05_06g" as govt_pass, "05_06n" as pvt_pass from tb_agg_mgmt_acadyr) TO '/home/megha/misc/sslc_mgmt/data05-06_aggregate.csv' WITH  DELIMITER '|' CSV HEADER;
COPY (select '2006-2007' as acad_year, dist_code, "06_07g" as govt_pass, "06_07n" as pvt_pass from tb_agg_mgmt_acadyr) TO '/home/megha/misc/sslc_mgmt/data06-07_aggregate.csv' WITH  DELIMITER '|' CSV HEADER;
COPY (select '2007-2008' as acad_year, dist_code, "07_08g" as govt_pass, "07_08n" as pvt_pass from tb_agg_mgmt_acadyr) TO '/home/megha/misc/sslc_mgmt/data07-08_aggregate.csv' WITH  DELIMITER '|' CSV HEADER;
COPY (select '2008-2009' as acad_year, dist_code, "08_09g" as govt_pass, "08_09n" as pvt_pass from tb_agg_mgmt_acadyr) TO '/home/megha/misc/sslc_mgmt/data08-09_aggregate.csv' WITH  DELIMITER '|' CSV HEADER;
COPY (select '2009-2010' as acad_year, dist_code, "09_10g" as govt_pass, "09_10n" as pvt_pass from tb_agg_mgmt_acadyr) TO '/home/megha/misc/sslc_mgmt/data09-10_aggregate.csv' WITH  DELIMITER '|' CSV HEADER;
COPY (select '2010-2011' as acad_year, dist_code, "10_11g" as govt_pass, "10_11n" as pvt_pass from tb_agg_mgmt_acadyr) TO '/home/megha/misc/sslc_mgmt/data10-11_aggregate.csv' WITH  DELIMITER '|' CSV HEADER;

-- Query to get Average Math, Kannada, English marks govt vs pvt

COPY (select govt_m.dist_code, govt_m."04_05m_g",govt_m."05_06m_g",govt_m."06_07m_g",govt_m."07_08m_g",govt_m."08_09m_g",govt_m."09_10m_g",govt_m."10_11m_g",pvt_m."04_05m_p",pvt_m."05_06m_p",pvt_m."06_07m_p",pvt_m."07_08m_p",pvt_m."08_09m_p",pvt_m."09_10m_p",pvt_m."10_11m_p" from (select dist_code,"04_05m" as "04_05m_g","05_06m" as "05_06m_g","06_07m" as "06_07m_g","07_08m" as "07_08m_g","08_09m" as "08_09m_g","09_10m" as "09_10m_g","10_11m" as "10_11m_g" from tb_agg_sub_acadyr where is_govt='G') as govt_m,(select dist_code,"04_05m" as "04_05m_p","05_06m" as "05_06m_p","06_07m" as "06_07m_p","07_08m" as "07_08m_p","08_09m" as "08_09m_p","09_10m" as "09_10m_p","10_11m" as "10_11m_p" from tb_agg_sub_acadyr where is_govt='N') as pvt_m where govt_m.dist_code = pvt_m.dist_code) TO '/home/megha/misc/sslc/sub_avg_math.csv' WITH  DELIMITER '|' CSV HEADER;
COPY (select govt_k.dist_code, govt_k."04_05k_g",govt_k."05_06k_g",govt_k."06_07k_g",govt_k."07_08k_g",govt_k."08_09k_g",govt_k."09_10k_g",govt_k."10_11k_g",pvt_k."04_05k_p",pvt_k."05_06k_p",pvt_k."06_07k_p",pvt_k."07_08k_p",pvt_k."08_09k_p",pvt_k."09_10k_p",pvt_k."10_11k_p" from (select dist_code,"04_05k" as "04_05k_g","05_06k" as "05_06k_g","06_07k" as "06_07k_g","07_08k" as "07_08k_g","08_09k" as "08_09k_g","09_10k" as "09_10k_g","10_11k" as "10_11k_g" from tb_agg_sub_acadyr where is_govt='G') as govt_k,(select dist_code,"04_05k" as "04_05k_p","05_06k" as "05_06k_p","06_07k" as "06_07k_p","07_08k" as "07_08k_p","08_09k" as "08_09k_p","09_10k" as "09_10k_p","10_11k" as "10_11k_p" from tb_agg_sub_acadyr where is_govt='N') as pvt_k where govt_k.dist_code = pvt_k.dist_code) TO '/home/megha/misc/sslc/sub_avg_kannada.csv' WITH  DELIMITER '|' CSV HEADER;
COPY (select govt_e.dist_code, govt_e."04_05e_g",govt_e."05_06e_g",govt_e."06_07e_g",govt_e."07_08e_g",govt_e."08_09e_g",govt_e."09_10e_g",govt_e."10_11e_g",pvt_e."04_05e_p",pvt_e."05_06e_p",pvt_e."06_07e_p",pvt_e."07_08e_p",pvt_e."08_09e_p",pvt_e."09_10e_p",pvt_e."10_11e_p" from (select dist_code,"04_05e" as "04_05e_g","05_06e" as "05_06e_g","06_07e" as "06_07e_g","07_08e" as "07_08e_g","08_09e" as "08_09e_g","09_10e" as "09_10e_g","10_11e" as "10_11e_g" from tb_agg_sub_acadyr where is_govt='G') as govt_e,(select dist_code,"04_05e" as "04_05e_p","05_06e" as "05_06e_p","06_07e" as "06_07e_p","07_08e" as "07_08e_p","08_09e" as "08_09e_p","09_10e" as "09_10e_p","10_11e" as "10_11e_p" from tb_agg_sub_acadyr where is_govt='N') as pvt_e where govt_e.dist_code = pvt_e.dist_code) TO '/home/megha/misc/sslc/sub_avg_english.csv' WITH  DELIMITER '|' CSV HEADER;

-- Query to get Boy vs Girl pass percentage : govt vs pvt.

COPY (select govt.dist_code, govt."04_05g" as "04_05g_G",govt."04_05b" as "04_05b_G",govt."05_06g" as "05_06g_G",govt."05_06b" as "05_06b_G",govt."06_07g" as "06_07g_G",govt."06_07b" as "06_07b_G",govt."07_08g" as "07_08g_G",govt."07_08b" as "07_08b_G",govt."08_09g" as "08_09g_G",govt."08_09b" as "08_09b_G",govt."09_10g" as "09_10g_G",govt."09_10b" as "09_10b_G",govt."10_11g" as "10_11g_G",govt."10_11b" as "10_11b_G",pvt."04_05g" as "04_05g_N",pvt."04_05b" as "04_05b_N",pvt."05_06g" as "05_06g_N",pvt."05_06b" as "05_06b_N",pvt."06_07g" as "06_07g_N",pvt."06_07b" as "06_07b_N",pvt."07_08g" as "07_08g_N",pvt."07_08b" as "07_08b_N",pvt."08_09g" as "08_09g_N",pvt."08_09b" as "08_09b_N",pvt."09_10g" as "09_10g_N",pvt."09_10b" as "09_10b_N",pvt."10_11g" as "10_11g_N",pvt."10_11b" as "10_11b_N" from (select * from tb_agg_gender_acadyr where is_govt='G') as govt,(select * from tb_agg_gender_acadyr where is_govt='N') as pvt where govt.dist_code = pvt.dist_code) TO '/home/megha/misc/sslc_gender/girl_vs_boy.csv' WITH  DELIMITER '|' CSV HEADER;

-- Query to get MOI vs Avg Eng and Kan marks

COPY (
select eng.dist_code,"sch_cnt_E","eng_avg_E","kan_avg_E","sch_cnt_K","eng_avg_K","kan_avg_K",
"sch_cnt_U","eng_avg_U","kan_avg_U","sch_cnt_O","eng_avg_O","kan_avg_O" from (select S.dist_code, S.sch_count as "sch_cnt_E", E."04_05e" as "eng_avg_E", E."04_05k" as "kan_avg_E" from tb_agg_moi_acadyr E left join (select dist_code, moi, sum(sch_count) as sch_count from tb_sslc_sch_agg group by dist_code,moi) as S on S.dist_code=E.dist_code where  E.moi='E' and E.moi=S.moi) as eng, (select S.dist_code, S.sch_count as "sch_cnt_K", K."04_05e" as "eng_avg_K", K."04_05k" as "kan_avg_K" from tb_agg_moi_acadyr K left join (select dist_code, moi, sum(sch_count) as sch_count from tb_sslc_sch_agg group by dist_code,moi) as S on S.dist_code=K.dist_code where K.moi='K' and K.moi=S.moi) as kan left outer join  (select S.dist_code, S.sch_count as "sch_cnt_U", U."04_05e" as "eng_avg_U", U."04_05k" as "kan_avg_U" from tb_agg_moi_acadyr U left join (select dist_code, moi, sum(sch_count) as sch_count from tb_sslc_sch_agg group by dist_code,moi) as S on S.dist_code=U.dist_code where  U.moi='U' and U.moi=S.moi) as urdu on kan.dist_code=urdu.dist_code left outer join (select S.dist_code, S.sch_count as "sch_cnt_O", O."04_05e" as "eng_avg_O", O."04_05k" as "kan_avg_O" from tb_agg_moi_acadyr O left join (select dist_code, moi, sum(sch_count) as sch_count from tb_sslc_sch_agg group by dist_code,moi) as S on S.dist_code=O.dist_code where O.moi='O' and O.moi=S.moi) as other on kan.dist_code=other.dist_code where eng.dist_code=kan.dist_code
) TO '/home/megha/misc/sslc_moi/data_bymoi_04_05.csv' WITH  DELIMITER '|' CSV HEADER;
COPY (
select eng.dist_code,"sch_cnt_E","eng_avg_E","kan_avg_E","sch_cnt_K","eng_avg_K","kan_avg_K",
"sch_cnt_U","eng_avg_U","kan_avg_U","sch_cnt_O","eng_avg_O","kan_avg_O" from (select S.dist_code, S.sch_count as "sch_cnt_E", E."05_06e" as "eng_avg_E", E."05_06k" as "kan_avg_E" from tb_agg_moi_acadyr E left join (select dist_code, moi, sum(sch_count) as sch_count from tb_sslc_sch_agg group by dist_code,moi) as S on S.dist_code=E.dist_code where  E.moi='E' and E.moi=S.moi) as eng, (select S.dist_code, S.sch_count as "sch_cnt_K", K."05_06e" as "eng_avg_K", K."05_06k" as "kan_avg_K" from tb_agg_moi_acadyr K left join (select dist_code, moi, sum(sch_count) as sch_count from tb_sslc_sch_agg group by dist_code,moi) as S on S.dist_code=K.dist_code where K.moi='K' and K.moi=S.moi) as kan left outer join  (select S.dist_code, S.sch_count as "sch_cnt_U", U."05_06e" as "eng_avg_U", U."05_06k" as "kan_avg_U" from tb_agg_moi_acadyr U left join (select dist_code, moi, sum(sch_count) as sch_count from tb_sslc_sch_agg group by dist_code,moi) as S on S.dist_code=U.dist_code where  U.moi='U' and U.moi=S.moi) as urdu on kan.dist_code=urdu.dist_code left outer join (select S.dist_code, S.sch_count as "sch_cnt_O", O."05_06e" as "eng_avg_O", O."05_06k" as "kan_avg_O" from tb_agg_moi_acadyr O left join (select dist_code, moi, sum(sch_count) as sch_count from tb_sslc_sch_agg group by dist_code,moi) as S on S.dist_code=O.dist_code where O.moi='O' and O.moi=S.moi) as other on kan.dist_code=other.dist_code where eng.dist_code=kan.dist_code
) TO '/home/megha/misc/sslc_moi/data_bymoi_05_06.csv' WITH  DELIMITER '|' CSV HEADER;
COPY (
select eng.dist_code,"sch_cnt_E","eng_avg_E","kan_avg_E","sch_cnt_K","eng_avg_K","kan_avg_K",
"sch_cnt_U","eng_avg_U","kan_avg_U","sch_cnt_O","eng_avg_O","kan_avg_O" from (select S.dist_code, S.sch_count as "sch_cnt_E", E."06_07e" as "eng_avg_E", E."06_07k" as "kan_avg_E" from tb_agg_moi_acadyr E left join (select dist_code, moi, sum(sch_count) as sch_count from tb_sslc_sch_agg group by dist_code,moi) as S on S.dist_code=E.dist_code where  E.moi='E' and E.moi=S.moi) as eng, (select S.dist_code, S.sch_count as "sch_cnt_K", K."06_07e" as "eng_avg_K", K."06_07k" as "kan_avg_K" from tb_agg_moi_acadyr K left join (select dist_code, moi, sum(sch_count) as sch_count from tb_sslc_sch_agg group by dist_code,moi) as S on S.dist_code=K.dist_code where K.moi='K' and K.moi=S.moi) as kan left outer join  (select S.dist_code, S.sch_count as "sch_cnt_U", U."06_07e" as "eng_avg_U", U."06_07k" as "kan_avg_U" from tb_agg_moi_acadyr U left join (select dist_code, moi, sum(sch_count) as sch_count from tb_sslc_sch_agg group by dist_code,moi) as S on S.dist_code=U.dist_code where  U.moi='U' and U.moi=S.moi) as urdu on kan.dist_code=urdu.dist_code left outer join (select S.dist_code, S.sch_count as "sch_cnt_O", O."06_07e" as "eng_avg_O", O."06_07k" as "kan_avg_O" from tb_agg_moi_acadyr O left join (select dist_code, moi, sum(sch_count) as sch_count from tb_sslc_sch_agg group by dist_code,moi) as S on S.dist_code=O.dist_code where O.moi='O' and O.moi=S.moi) as other on kan.dist_code=other.dist_code where eng.dist_code=kan.dist_code
) TO '/home/megha/misc/sslc_moi/data_bymoi_06_07.csv' WITH  DELIMITER '|' CSV HEADER;
COPY (
select eng.dist_code,"sch_cnt_E","eng_avg_E","kan_avg_E","sch_cnt_K","eng_avg_K","kan_avg_K",
"sch_cnt_U","eng_avg_U","kan_avg_U","sch_cnt_O","eng_avg_O","kan_avg_O" from (select S.dist_code, S.sch_count as "sch_cnt_E", E."07_08e" as "eng_avg_E", E."07_08k" as "kan_avg_E" from tb_agg_moi_acadyr E left join (select dist_code, moi, sum(sch_count) as sch_count from tb_sslc_sch_agg group by dist_code,moi) as S on S.dist_code=E.dist_code where  E.moi='E' and E.moi=S.moi) as eng, (select S.dist_code, S.sch_count as "sch_cnt_K", K."07_08e" as "eng_avg_K", K."07_08k" as "kan_avg_K" from tb_agg_moi_acadyr K left join (select dist_code, moi, sum(sch_count) as sch_count from tb_sslc_sch_agg group by dist_code,moi) as S on S.dist_code=K.dist_code where K.moi='K' and K.moi=S.moi) as kan left outer join  (select S.dist_code, S.sch_count as "sch_cnt_U", U."07_08e" as "eng_avg_U", U."07_08k" as "kan_avg_U" from tb_agg_moi_acadyr U left join (select dist_code, moi, sum(sch_count) as sch_count from tb_sslc_sch_agg group by dist_code,moi) as S on S.dist_code=U.dist_code where  U.moi='U' and U.moi=S.moi) as urdu on kan.dist_code=urdu.dist_code left outer join (select S.dist_code, S.sch_count as "sch_cnt_O", O."07_08e" as "eng_avg_O", O."07_08k" as "kan_avg_O" from tb_agg_moi_acadyr O left join (select dist_code, moi, sum(sch_count) as sch_count from tb_sslc_sch_agg group by dist_code,moi) as S on S.dist_code=O.dist_code where O.moi='O' and O.moi=S.moi) as other on kan.dist_code=other.dist_code where eng.dist_code=kan.dist_code
) TO '/home/megha/misc/sslc_moi/data_bymoi_07_08.csv' WITH  DELIMITER '|' CSV HEADER;
COPY (
select eng.dist_code,"sch_cnt_E","eng_avg_E","kan_avg_E","sch_cnt_K","eng_avg_K","kan_avg_K",
"sch_cnt_U","eng_avg_U","kan_avg_U","sch_cnt_O","eng_avg_O","kan_avg_O" from (select S.dist_code, S.sch_count as "sch_cnt_E", E."08_09e" as "eng_avg_E", E."08_09k" as "kan_avg_E" from tb_agg_moi_acadyr E left join (select dist_code, moi, sum(sch_count) as sch_count from tb_sslc_sch_agg group by dist_code,moi) as S on S.dist_code=E.dist_code where  E.moi='E' and E.moi=S.moi) as eng, (select S.dist_code, S.sch_count as "sch_cnt_K", K."08_09e" as "eng_avg_K", K."08_09k" as "kan_avg_K" from tb_agg_moi_acadyr K left join (select dist_code, moi, sum(sch_count) as sch_count from tb_sslc_sch_agg group by dist_code,moi) as S on S.dist_code=K.dist_code where K.moi='K' and K.moi=S.moi) as kan left outer join  (select S.dist_code, S.sch_count as "sch_cnt_U", U."08_09e" as "eng_avg_U", U."08_09k" as "kan_avg_U" from tb_agg_moi_acadyr U left join (select dist_code, moi, sum(sch_count) as sch_count from tb_sslc_sch_agg group by dist_code,moi) as S on S.dist_code=U.dist_code where  U.moi='U' and U.moi=S.moi) as urdu on kan.dist_code=urdu.dist_code left outer join (select S.dist_code, S.sch_count as "sch_cnt_O", O."08_09e" as "eng_avg_O", O."08_09k" as "kan_avg_O" from tb_agg_moi_acadyr O left join (select dist_code, moi, sum(sch_count) as sch_count from tb_sslc_sch_agg group by dist_code,moi) as S on S.dist_code=O.dist_code where O.moi='O' and O.moi=S.moi) as other on kan.dist_code=other.dist_code where eng.dist_code=kan.dist_code
) TO '/home/megha/misc/sslc_moi/data_bymoi_08_09.csv' WITH  DELIMITER '|' CSV HEADER;
COPY (
select eng.dist_code,"sch_cnt_E","eng_avg_E","kan_avg_E","sch_cnt_K","eng_avg_K","kan_avg_K",
"sch_cnt_U","eng_avg_U","kan_avg_U","sch_cnt_O","eng_avg_O","kan_avg_O" from (select S.dist_code, S.sch_count as "sch_cnt_E", E."09_10e" as "eng_avg_E", E."09_10k" as "kan_avg_E" from tb_agg_moi_acadyr E left join (select dist_code, moi, sum(sch_count) as sch_count from tb_sslc_sch_agg group by dist_code,moi) as S on S.dist_code=E.dist_code where  E.moi='E' and E.moi=S.moi) as eng, (select S.dist_code, S.sch_count as "sch_cnt_K", K."09_10e" as "eng_avg_K", K."09_10k" as "kan_avg_K" from tb_agg_moi_acadyr K left join (select dist_code, moi, sum(sch_count) as sch_count from tb_sslc_sch_agg group by dist_code,moi) as S on S.dist_code=K.dist_code where K.moi='K' and K.moi=S.moi) as kan left outer join  (select S.dist_code, S.sch_count as "sch_cnt_U", U."09_10e" as "eng_avg_U", U."09_10k" as "kan_avg_U" from tb_agg_moi_acadyr U left join (select dist_code, moi, sum(sch_count) as sch_count from tb_sslc_sch_agg group by dist_code,moi) as S on S.dist_code=U.dist_code where  U.moi='U' and U.moi=S.moi) as urdu on kan.dist_code=urdu.dist_code left outer join (select S.dist_code, S.sch_count as "sch_cnt_O", O."09_10e" as "eng_avg_O", O."09_10k" as "kan_avg_O" from tb_agg_moi_acadyr O left join (select dist_code, moi, sum(sch_count) as sch_count from tb_sslc_sch_agg group by dist_code,moi) as S on S.dist_code=O.dist_code where O.moi='O' and O.moi=S.moi) as other on kan.dist_code=other.dist_code where eng.dist_code=kan.dist_code
) TO '/home/megha/misc/sslc_moi/data_bymoi_09_10.csv' WITH  DELIMITER '|' CSV HEADER;
COPY (
select eng.dist_code,"sch_cnt_E","eng_avg_E","kan_avg_E","sch_cnt_K","eng_avg_K","kan_avg_K",
"sch_cnt_U","eng_avg_U","kan_avg_U","sch_cnt_O","eng_avg_O","kan_avg_O" from (select S.dist_code, S.sch_count as "sch_cnt_E", E."10_11e" as "eng_avg_E", E."10_11k" as "kan_avg_E" from tb_agg_moi_acadyr E left join (select dist_code, moi, sum(sch_count) as sch_count from tb_sslc_sch_agg group by dist_code,moi) as S on S.dist_code=E.dist_code where  E.moi='E' and E.moi=S.moi) as eng, (select S.dist_code, S.sch_count as "sch_cnt_K", K."10_11e" as "eng_avg_K", K."10_11k" as "kan_avg_K" from tb_agg_moi_acadyr K left join (select dist_code, moi, sum(sch_count) as sch_count from tb_sslc_sch_agg group by dist_code,moi) as S on S.dist_code=K.dist_code where K.moi='K' and K.moi=S.moi) as kan left outer join  (select S.dist_code, S.sch_count as "sch_cnt_U", U."10_11e" as "eng_avg_U", U."10_11k" as "kan_avg_U" from tb_agg_moi_acadyr U left join (select dist_code, moi, sum(sch_count) as sch_count from tb_sslc_sch_agg group by dist_code,moi) as S on S.dist_code=U.dist_code where  U.moi='U' and U.moi=S.moi) as urdu on kan.dist_code=urdu.dist_code left outer join (select S.dist_code, S.sch_count as "sch_cnt_O", O."10_11e" as "eng_avg_O", O."10_11k" as "kan_avg_O" from tb_agg_moi_acadyr O left join (select dist_code, moi, sum(sch_count) as sch_count from tb_sslc_sch_agg group by dist_code,moi) as S on S.dist_code=O.dist_code where O.moi='O' and O.moi=S.moi) as other on kan.dist_code=other.dist_code where eng.dist_code=kan.dist_code
) TO '/home/megha/misc/sslc_moi/data_bymoi_10_11.csv' WITH  DELIMITER '|' CSV HEADER;