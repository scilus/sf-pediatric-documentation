---
title: Pipeline Parameters
description: sf-pediatric parameters
slug: 0.2.1/guides/parameters
---

### **Input/output options**

This section will detail how to set the inputs and outputs of the pipeline.

| Parameter | Description | Type | Default | Required | Hidden |
|-----------|-----------|-----------|-----------|-----------|-----------|
| `input` | Path to the BIDS directory location. <details><summary>Help</summary><small>Ensure the BIDS data structure is respected. For more information, see the [documentation](https://scilus.github.io/sf-pediatric/guides/inputs/)</small></details>| `string` |  |  |  |
| `participant_label` | List of participant IDs or a single participant ID. <details><summary>Help</summary><small>This will be used to select the specific participants to process. The best way to provide them is in a params.yml file, see the [documentation](https://scilus.github.io/sf-pediatric/guides/usage/#using-the-paramsyml-file) for more information.</small></details>| `array` |  |  |  |
| `input_deriv` | Path to the derivatives directory to use as input. | `string` |  |  |  |
| `bids_script` | Path to the BIDS script. <details><summary>Help</summary><small>This is a script that will be used to generate the BIDS directory structure from the raw data. Unless you know what you are doing, this should not be changed. Will be removed in a future release.</small></details>| `string` |  |  | True |
| `outdir` | The output directory where the results will be saved. You have to use absolute paths to storage on Cloud infrastructure. <details><summary>Help</summary><small>For a detailed description of the output files, please see the [documentation](https://scilus.github.io/sf-pediatric/guides/outputs/).</small></details>| `string` |  | True |  |
| `email` | Email address for completion summary. <details><summary>Help</summary><small>Set this parameter to your e-mail address to get a summary e-mail with details of the run sent to you when the workflow exits. If set in your user config file (`~/.nextflow/config`) then you don't need to specify this on the command line for every run.</small></details>| `string` |  |  |  |
| `multiqc_title_subject` | MultiQC report title for subject report. Printed as page header, used for filename if not otherwise specified. | `string` |  |  |  |
| `multiqc_title_global` | MultiQC report title for global report. Printed as page header, used for filename if not otherwise specified. | `string` |  |  |  |

### **Segmentation Options**

Options for FreeSurfer, FastSurfer, and/or M-CRIB-S processing. Only relevant if you select the segmentation profile.

| Parameter | Description | Type | Default | Required | Hidden |
|-----------|-----------|-----------|-----------|-----------|-----------|
| `method` | Method to use to perform surface reconstruction and cortical/subcortical segmentation. Will only affect subjects > 3 months of age. Recon-all-clinical is highly recommended for subjects between 3 months and 5 years old. Options include recon-all, recon-all-clinical, or FastSurfer. (accepted: `recon-all-clinical`|`recon-all`|`fastsurfer`) | `string` | recon-all-clinical |  | False |
| `fs_license` | Path to FreeSurfer license file. <details><summary>Help</summary><small>This is required to run the segmentation profile. You can obtain a FreeSurfer license from the [FreeSurfer website here](https://surfer.nmr.mgh.harvard.edu/registration.html).</small></details>| `string` |  |  |  |
| `cerebnet` | Use CerebNet for cerebellum segmentation in FastSurfer. | `boolean` | False |  | True |
| `hypvinn` | Use HypVINN for hypothalamus sub-segmentation in FastSurfer. | `boolean` | False |  | True |
| `acq3T` | Use 3T acquisition parameters. | `boolean` | True |  | True |
| `fs_output_dir` | Path to FreeSurfer/FastSurfer/M-CRIB-S output directory. <details><summary>Help</summary><small>Default location will be alongside `--outdir`. For more information, please see the [documentation](https://scilus.github.io/sf-pediatric/guides/outputs/)</small></details>| `string` |  |  | False |
| `mcribs_jointhresh` | Join threshold used in the MCRIBS surface reconstruction step. | `number` |  |  | True |
| `mcribs_fastcollision` | Use deformable fast collision test in the MCRIBS surface reconstruction step. | `boolean` | False |  | True |
| `mcribs_nopialoutside` | Do not ensure pial is outside of WM in the MCRIBS surface reconstruction step. | `boolean` | False |  | True |
| `mcribs_seed` | Seed used in the MCRIBS surface reconstruction step. | `number` | 1234 |  | True |

### **Atlases Options**

Options for atlases used in the pipeline.

| Parameter | Description | Type | Default | Required | Hidden |
|-----------|-----------|-----------|-----------|-----------|-----------|
| `utils_folder` | Path to the utils folder. <details><summary>Help</summary><small>This folder contains the atlases used in the pipeline. Unless you know what you are doing, please do not change this.</small></details>| `string` |  |  | True |

### **Processing steps to apply on anatomical images.**

Processing steps to apply on anatomical images. (NOTE: the same steps will be applied on both T1w/T2w if both are available).

| Parameter | Description | Type | Default | Required | Hidden |
|-----------|-----------|-----------|-----------|-----------|-----------|
| `preproc_run_denoising` | Run denoising on the anatomical images. | `boolean` | True |  | False |
| `preproc_run_N4` | Run N4 bias correction on the anatomical images. | `boolean` | True |  | False |
| `preproc_run_resampling` | Run resampling on the anatomical images. | `boolean` | True |  | False |
| `preproc_run_synthstrip` | Run SynthStrip for brain extraction. | `boolean` | True |  | False |
| `preproc_run_ants_bet` | Run AntsBet for brain extraction <details><summary>Help</summary><small>This step will require the use of a template image which does not match all ages and is much slower than the default synthstrip method. Not recommended.</small></details>| `boolean` | False |  | False |
| `preproc_run_crop` | Run cropping on the anatomical images. | `boolean` | True |  | False |
| `synthstrip_weights` | Path to alternative weights for SynthStrip brain extraction. | `string` | None |  | False |

### **T1w Processing Options**

Options for T1w processing. In the case where you do not have a T1w image, you can ignore those options.

| Parameter | Description | Type | Default | Required | Hidden |
|-----------|-----------|-----------|-----------|-----------|-----------|
| `t1_denoise_number_of_coils` | Number of coils used in the T1w denoising step. | `integer` | 1 |  | True |
| `t1_bias_bspline_knot_per_voxel` | Number of B-spline knots per voxel used in the T1w bias correction step. | `number` | 8 |  | True |
| `t1_bias_shrink_factor` | Shrink factor used in the T1w bias correction step. | `integer` | 4 |  | True |
| `t1_resample_voxel_size` | Voxel size used in the T1w resampling step. | `integer` | 1 |  | True |
| `t1_resample_interp` | Interpolation method used in the T1w resampling step. | `string` | lin |  | True |
| `t1_synthstrip_border` | Mask border threshold used in the SynthStrip brain extraction step. | `integer` | 1 |  | True |
| `t1_synthstrip_nocsf` | Exclude CSF from the border in the SynthStrip brain extraction step. | `boolean` | False |  | True |

### **T2w Preprocessing Options**

Options for T2w preprocessing. In the case where you do not have a T2w image, you can ignore those options.

| Parameter | Description | Type | Default | Required | Hidden |
|-----------|-----------|-----------|-----------|-----------|-----------|
| `t2_denoise_number_of_coils` | Number of coils used in the T2w denoising step. | `integer` | 1 |  | True |
| `t2_bias_bspline_knot_per_voxel` | Number of B-spline knots per voxel used in the T2w bias correction step. | `number` | 8 |  | True |
| `t2_bias_shrink_factor` | Shrink factor used in the T2w bias correction step. | `integer` | 4 |  | True |
| `t2_resample_voxel_size` | Voxel size used in the T2w resampling step. | `integer` | 1 |  | True |
| `t2_resample_interp` | Interpolation method used in the T2w resampling step. | `string` | lin |  | True |
| `t2_synthstrip_border` | Mask border threshold used in the SynthStrip brain extraction step. | `integer` | 1 |  | True |
| `t2_synthstrip_nocsf` | Exclude CSF from the border in the SynthStrip brain extraction step. | `boolean` | False |  | True |

### **Anatomical Co-registration Options**

Options for anatomical co-registration. Will only be performed if both T2w and T1w images are available.

| Parameter | Description | Type | Default | Required | Hidden |
|-----------|-----------|-----------|-----------|-----------|-----------|
| `coreg_dimensionality` | Dimensionality of the registered images. | `integer` | 3 |  | True |
| `coreg_transform` | Transform used in the coregistration step. t: translation (1 stage), r: rigid (1 stage), a: rigid + affine (2 stages), s: rigid + affine + deformable syn (3 stages) (accepted: `t`|`r`|`a`|`s`) | `string` | a |  | False |
| `coreg_quick` | Use antsRegistrationSyNQuick for the coregistration step. | `boolean` | False |  | False |

### **DWI Preprocessing Options**

Options for DWI preprocessing. You can use these options to customise the behaviour of the DWI preprocessing steps.

| Parameter | Description | Type | Default | Required | Hidden |
|-----------|-----------|-----------|-----------|-----------|-----------|
| `skip_dwi_preprocessing` | Skip the DWI preprocessing steps. | `boolean` | False |  | False |
| `dwi_b0_threshold` | B0 threshold used in the DWI preprocessing steps. | `integer` | 20 |  | False |
| `dwi_shell_tolerance` | Shell tolerance used in the DWI preprocessing steps. | `integer` | 50 |  | False |
| `preproc_dwi_run_denoising` | Run denoising on the DWI images. | `boolean` | True |  | False |
| `dwi_denoise_patch_size` | Patch size used in the DWI denoising step. | `integer` | 7 |  | True |
| `preproc_dwi_run_degibbs` | Run Gibbs ringing correction on the DWI images. | `boolean` | False |  | False |
| `topup_eddy_run_topup` | Run topup in the susceptibility distortion correction step. | `boolean` | True |  | False |
| `dwi_susceptibility_config_file` | Path to the susceptibility distortion correction config file. | `string` | b02b0.cnf |  | True |
| `dwi_susceptibility_output_prefix` | Prefix used in the susceptibility distortion correction step. | `string` | topup\_results |  | True |
| `dwi_susceptibility_readout` | Readout time used in the susceptibility distortion correction step. | `number` | 0.04 |  | True |
| `dwi_susceptibility_encoding_dir` | Encoding direction used in the susceptibility distortion correction step. | `string` | y |  | True |
| `topup_eddy_run_eddy` | Run eddy in the eddy current correction step. | `boolean` | True |  | False |
| `dwi_motion_and_eddy_command` | Command used in the motion and eddy correction step. | `string` | eddy\_cpu |  | True |
| `dwi_motion_and_eddy_bet_f_threshold` | Bet f threshold used in the motion and eddy correction step. | `number` | 0.16 |  | True |
| `dwi_motion_and_eddy_restore_slices` | Restore slices in the motion and eddy correction step. | `boolean` | True |  | True |
| `dwi_pwdavg_shells` | Shells used in the PowderAverage step. | `string` |  |  | False |
| `dwi_run_synthstrip` | Run SynthStrip for brain extraction | `boolean` | True |  | False |
| `dwi_synthstrip_border` | Brain border used in the SynthStrip brain extraction step. | `integer` | 1 |  | True |
| `dwi_synthstrip_nocsf` | Exclude CSF from the border in the SynthStrip brain extraction step. | `boolean` | False |  | True |
| `dwi_synthstrip_weights` | Alternative weights used in the SynthStrip brain extraction step. | `string` | None |  | False |
| `dwi_bet_f_threshold` | Bet f threshold used in the brain extraction step. | `number` | 0.16 |  | True |
| `preproc_dwi_run_N4` | Run N4 bias correction on the DWI images. | `boolean` | True |  | False |
| `dwi_bias_bspline_knot_per_voxel` | Number of B-spline knots per voxel used in the DWI bias correction step. | `number` | 8 |  | True |
| `dwi_bias_shrink_factor` | Shrink factor used in the DWI bias correction step. | `integer` | 4 |  | True |
| `dwi_normalize_fa_mask_threshold` | FA mask threshold used in the normalization step. | `number` | 0.4 |  | False |
| `preproc_dwi_run_resampling` | Run resampling on the DWI images. | `boolean` | True |  | False |
| `dwi_resample_voxel_size` | Voxel size used in the DWI resampling step. | `integer` | 1 |  | True |
| `dwi_resample_interp` | Interpolation method used in the DWI resampling step. | `string` | lin |  | True |
| `dwi_resample_mask_voxel_size` | Voxel size used in the DWI mask resampling step. | `integer` | 1 |  | True |
| `dwi_resample_mask_interp` | Interpolation method used in the DWI mask resampling step. | `string` | nn |  | True |

### **DTI Options**

Options for diffusion tensor fitting.

| Parameter | Description | Type | Default | Required | Hidden |
|-----------|-----------|-----------|-----------|-----------|-----------|
| `dti_max_shell_value` | Maximum shell value used in the DTI processing step. | `integer` | 1200 |  | True |
| `dti_shells` | Shells used in the DTI processing step. | `string` |  |  | False |

### **FRF Options**

Options for fiber response function (FRF) processing. The FRF is derived from normative curves in function of each participant's age. The current options are mostly if you want to override this default behavior.

| Parameter | Description | Type | Default | Required | Hidden |
|-----------|-----------|-----------|-----------|-----------|-----------|
| `frf_fa` | Minimum FA threshold to use to compute the FRF. | `number` | 0.7 |  | True |
| `frf_min_fa` | Minimum FA threshold to use to compute the FRF. | `number` | 0.5 |  | True |
| `frf_nvox_min` | Minimum number of voxels to include in the computation of the FRF. | `integer` | 300 |  | True |
| `frf_roi_radius` | Radius of the ROI used to compute the FRF. | `integer` | 20 |  | True |
| `frf_max_dti_shell_value` | Maximum DTI shell value used. | `integer` | 1200 |  | True |
| `frf_min_fodf_shell_value` | Minimum FODF shell value used. | `integer` | 700 |  | True |
| `frf_set_method` | Method used to compute the FRF. (accepted: `ssst`) | `string` | ssst |  | False |
| `frf_manual_frf` | Manual FRF values.(e.g. '15,4,4'). This is set from the normative curves. Use this option only to apply a single FRF to every participants. For more information, please see [the documentation](https://scilus.github.io/sf-pediatric/guides/priors/). | `string` |  |  | False |

### **FODF Options**

Options for FODF processing.

| Parameter | Description | Type | Default | Required | Hidden |
|-----------|-----------|-----------|-----------|-----------|-----------|
| `fodf_min_fodf_shell_value` | Minimum FODF shell value used. | `integer` | 700 |  | True |
| `fodf_shells` | Shells used in the FODF processing step. | `string` |  |  | False |
| `fodf_sh_order` | Spherical harmonics order used in the FODF processing step. | `integer` | 8 |  | False |
| `fodf_sh_basis` | Spherical harmonics basis used in the FODF processing step. Choices: descoteaux07 or tournier07. (accepted: `descoteaux07`|`tournier07`) | `string` | descoteaux07 |  | False |
| `fodf_set_method` | Method used to compute the FODF. (accepted: `ssst`) | `string` | ssst |  | False |
| `fodf_relative_threshold` | Relative threshold used in the FODF processing step. | `number` | 0.1 |  | True |
| `fodf_a_factor` | FODF a factor used in the FODF processing step. | `number` | 2.0 |  | True |
| `fodf_max_fa_threshold` | Maximum FA threshold used in the FODF processing step. | `number` | 0.1 |  | True |
| `fodf_min_md_threshold` | Minimum MD threshold used in the FODF processing step. | `number` | 0.002 |  | True |

### **PFT Tracking Options**

Options for Particle Filter Tracking (PFT).

| Parameter | Description | Type | Default | Required | Hidden |
|-----------|-----------|-----------|-----------|-----------|-----------|
| `run_pft_tracking` | Run PFT tracking. | `boolean` | True |  | False |
| `pft_seeding_mask_type` | Seeding mask type used in the PFT tracking step. Choices: wm, fa, or interface. (accepted: `wm`|`fa`|`interface`) | `string` | wm |  | False |
| `pft_fa_threshold` | FA threshold to use on FA map to generate seeding mask. | `number` | 0.2 |  | True |
| `pft_random_seed` | Random seed used in the PFT tracking step. | `integer` | 1234 |  | True |
| `pft_compress` | If true, compress the streamlines. | `boolean` | True |  | True |
| `pft_compress_value` | Compression value for the streamlines' compression. | `number` | 0.2 |  | True |
| `pft_algo` | Algorithm used in the PFT tracking step. Choices: prob or det (accepted: `prob`|`det`) | `string` | prob |  | False |
| `pft_nbr_seeds` | Number of seeds used in the PFT tracking step. | `integer` | 10 |  | False |
| `pft_seeding_type` | Seeding type used in the PFT tracking step. Choices: npv or nt. (accepted: `npv`|`nt`) | `string` | npv |  | False |
| `pft_step` | Step value used in the PFT tracking step. | `number` | 0.5 |  | True |
| `pft_theta` | Theta value used in the PFT tracking step. | `number` | 20 |  | True |
| `pft_sfthres` | SF threshold used in the PFT tracking step. | `number` | 0.1 |  | True |
| `pft_sfthres_init` | Initial SF threshold used in the PFT tracking step. | `number` | 0.5 |  | True |
| `pft_min_len` | Minimum length used in the PFT tracking step. | `number` | 20 |  | False |
| `pft_max_len` | Maximum length used in the PFT tracking step. | `number` | 200 |  | False |
| `pft_particles` | Number of particles used in the PFT tracking step. | `integer` | 15 |  | True |
| `pft_back` | Length of PFT back tracking (mm) | `integer` | 2 |  | True |
| `pft_front` | Length of PFT forward tracking (mm). | `integer` | 1 |  | True |

### **Local Tracking Options**

Options for local tracking.

| Parameter | Description | Type | Default | Required | Hidden |
|-----------|-----------|-----------|-----------|-----------|-----------|
| `run_local_tracking` | Run local tracking. | `boolean` | True |  | False |
| `local_seeding_mask_type` | Seeding mask type used in the local tracking step. (accepted: `wm`|`fa`) | `string` | wm |  | False |
| `local_fa_tracking_mask_threshold` | FA threshold used for the tracking mask. | `number` | 0.4 |  | True |
| `local_fa_seeding_mask_threshold` | FA threshold used for the seeding mask. | `number` | 0.4 |  | True |
| `local_tracking_mask_type` | Tracking mask type used in the local tracking step. Choices: wm, fa, or interface. (accepted: `wm`|`fa`) | `string` | wm |  | False |
| `local_random_seed` | Random seed used in the local tracking step. | `integer` | 1234 |  | True |
| `local_compress` | If true, compress the streamlines. | `boolean` | True |  | True |
| `local_compress_value` | Compression value for the streamlines' compression. | `number` | 0.2 |  | True |
| `local_algo` | Algorithm used in the local tracking step. Choices: prob or det (accepted: `prob`|`det`) | `string` | prob |  | False |
| `local_nbr_seeds` | Number of seeds used in the local tracking step. | `integer` | 10 |  | False |
| `local_seeding_type` | Seeding type used in the local tracking step. Choices: npv or nt. (accepted: `npv`|`nt`) | `string` | npv |  | False |
| `local_step` | Step value used in the local tracking step. | `number` | 0.5 |  | True |
| `local_theta` | Theta value used in the local tracking step. | `number` | 20 |  | True |
| `local_sfthres` | SF threshold used in the local tracking step. | `number` | 0.1 |  | True |
| `local_min_len` | Minimum length used in the local tracking step. | `number` | 20 |  | False |
| `local_max_len` | Maximum length used in the local tracking step. | `number` | 200 |  | False |

### **Diffusivities Options**

Parameters for tuning diffusivities used in models fitting

| Parameter | Description | Type | Default | Required | Hidden |
|-----------|-----------|-----------|-----------|-----------|-----------|
| `average_diff_priors` | If set to true, will compute the average diffusivities for the NODDI/Freewater models and average them across all subjects to use as fixed diffusivities for all subjects. | `boolean` | False |  | False |
| `para_diff` | Parallel diffusivity value to use in models fitting (in mm^2/s). If not set, it will be derived from normative growth curves based on participant's age. | `number` |  |  | False |
| `iso_diff` | Isotropic diffusivity value to use in models fitting (in mm^2/s). If not set, it will be derived from normative growth curves based on participant's age. | `number` |  |  | False |
| `perp_diff` | Perpendicular diffusivity value to use in models fitting (in mm^2/s). If not set, it will be derived from normative growth curves based on participant's age. | `number` |  |  | False |
| `perp_diff_min` | Minimum perpendicular diffusivity value (in mm^2/s) to use in models fitting. If not set, it will be derived from normative growth curves based on participant's age | `number` |  |  | False |
| `perp_diff_max` | Maximum perpendicular diffusivity value (in mm^2/s) to use in models fitting. If not set, it will be derived from normative growth curves based on participant's age | `number` |  |  | False |

### **NODDI Options**

Options for NODDI model fitting.

| Parameter | Description | Type | Default | Required | Hidden |
|-----------|-----------|-----------|-----------|-----------|-----------|
| `run_noddi` | Whether to run the NODDI processing step. If selected, the resulting metric maps will be added to the list used in the bundling and connectomics profile. NODDI is only available for multi-shell acquisitions, for single-shell acquisitions, please consider using Freewater model instead. | `boolean` | False |  | False |
| `noddi_lambda1` | Value to use as the first regularization parameter (lambda1) in the NODDI fitting process. | `number` | 0.5 |  | True |
| `noddi_lambda2` | Value to use as the second regularization parameter (lambda2) in the NODDI fitting process. | `number` | 0.001 |  | True |

### **Freewater Options**

Options for Freewater model fitting.

| Parameter | Description | Type | Default | Required | Hidden |
|-----------|-----------|-----------|-----------|-----------|-----------|
| `run_freewater` | Whether to run the Freewater processing step. If selected, the resulting metric maps will be added to the list used in the bundling and connectomics profile. | `boolean` | False |  | False |
| `freewater_lambda1` | Value to use as the first regularization parameter (lambda1) in the Freewater fitting process. | `number` | 0 |  | True |
| `freewater_lambda2` | Value to use as the second regularization parameter (lambda2) in the Freewater fitting process. | `number` | 0.25 |  | True |

### **BundleSeg Options**

Options for BundleSeg

| Parameter | Description | Type | Default | Required | Hidden |
|-----------|-----------|-----------|-----------|-----------|-----------|
| `atlas_directory` | Path to the WM bundles atlas directory. <details><summary>Help</summary><small>This allows you to specify a custom atlas for bundle segmentation. If not provided, the default atlas included with the pipeline will be used. NOTE: The provided atlas will be used with all participants without accounting for age.</small></details>| `string` | None |  | False |
| `minimal_vote_ratio` | Ratio of vote across models to consider a streamline for saving. If you have 5 input models and a ratio of 0.5, you will need at least 3 votes. | `number` | 0.5 |  | False |
| `outlier_alpha` | Percentage of the length of the tree that clusters of individual streamlines will be pruned. Higher values will remove more streamlines. | `number` | 0.6 |  | False |
| `nb_points` | Number of points to segment the bundles. | `integer` | 5 |  | False |
| `colormap` | Colormap to use for coloring the bundles. Color only affects visualization. | `string` | jet |  | False |
| `use_hyperplane` | If set, will use hyperplane to segment bundles (still experimental), otherwise, will use the euclidean distance. | `boolean` | False |  | False |
| `use_manhattan` | If set, will use manhattan distance to segment bundles, otherwise, will use the euclidean distance. | `boolean` | False |  | False |
| `density_weighting` | If set, weight statistics based on the number of voxel going through the voxel. | `boolean` | True |  | False |
| `normalize_weights` | If set, the weights will be normalized to the \[0,1] range. | `boolean` | True |  | False |
| `length_stats` | If set, will output bundles' length. | `boolean` | True |  | False |
| `endpoints_stats` | If set, will output statistics in endpoints. | `boolean` | True |  | False |
| `means_std` | If set, will output mean and std values per bundle per metrics. | `boolean` | True |  | False |
| `volume` | If set, will output volume values per bundle. | `boolean` | True |  | False |
| `streamline_count` | If set, will output the streamline count per bundle. | `boolean` | True |  | False |
| `volume_per_labels` | If set, will output volume values per labels per bundle. | `boolean` | True |  | False |
| `mean_std_per_point` | If set, will output mean and std per points per metrics per bundle. | `boolean` | True |  | False |

### **Transform Labels Options**

Options for transforming labels from anatomical to diffusion space.

| Parameter | Description | Type | Default | Required | Hidden |
|-----------|-----------|-----------|-----------|-----------|-----------|
| `labels_transform_dimensionality` | Dimensionality of the label file. | `integer` | 3 |  | True |
| `labels_output_suffix` | Name to use as suffix in the output filename. | `string` | \_labels |  | True |
| `labels_interpolation` | Interpolation method used in the label transformation step. Choices: NearestNeighbor, Linear, or BSpline. (accepted: `NearestNeighbor`|`Linear`|`BSpline`) | `string` | NearestNeighbor |  | True |
| `labels_output_dtype` | Output data type used in the label transformation step. Choices: float or int. (accepted: `float`|`int`) | `string` | int |  | True |

### **COMMIT Options**

Options for COMMIT filtering.

| Parameter | Description | Type | Default | Required | Hidden |
|-----------|-----------|-----------|-----------|-----------|-----------|
| `run_commit2` | Run COMMIT2 filtering. | `boolean` | True |  | False |
| `commit2_lambda` | Lambda value used in the COMMIT filtering step. | `number` | 0.001 |  | True |
| `commit_ball_stick` | Use the ball and stick model in the COMMIT filtering step. | `boolean` | False |  | True |
| `commit_nbr_dir` | Number of directions used in the COMMIT filtering step. | `integer` | 500 |  | True |

### **Decompose Tractogram Options**

Options for decomposing the tractogram according to a label file.

| Parameter | Description | Type | Default | Required | Hidden |
|-----------|-----------|-----------|-----------|-----------|-----------|
| `decompose_no_pruning` | Do not prune the tractogram. | `boolean` | False |  | True |
| `decompose_no_remove_loops` | Do not remove loops from the tractogram. | `boolean` | False |  | True |
| `decompose_no_remove_outliers` | Do not remove outliers from the tractogram. | `boolean` | False |  | True |
| `decompose_no_remove_curv` | Do not remove curvilinear structures from the tractogram. | `boolean` | False |  | True |
| `decompose_min_len` | Minimum length used in the tractogram decomposition step. | `number` | 20 |  | False |
| `decompose_max_len` | Maximum length used in the tractogram decomposition step. | `number` | 200 |  | False |
| `decompose_outlier_threshold` | Outlier threshold used in the tractogram decomposition step. | `number` | 0.6 |  | False |
| `decompose_max_angle` | Maximum angle used in the tractogram decomposition step. | `number` | 330.0 |  | False |
| `decompose_max_curv` | Maximum curvature used in the tractogram decomposition step. | `number` | 10.0 |  | False |

### **AFD Fixel Options**

Options for AFD fixel processing.

| Parameter | Description | Type | Default | Required | Hidden |
|-----------|-----------|-----------|-----------|-----------|-----------|
| `afd_fixel_length_weighting` | Use length weighting in the AFD fixel processing step. | `boolean` | False |  | True |

### **Output to Template Options**

Options for outputting to specific template space.

| Parameter | Description | Type | Default | Required | Hidden |
|-----------|-----------|-----------|-----------|-----------|-----------|
| `template` | Template space to output to. The available template are the ones supported by TemplateFlow, please see their documentation for an exhaustive list (https://www.templateflow.org/browse/). | `string` | None |  | False |
| `templateflow_res` | Resolution of the template space. | `integer` | 1 |  | False |
| `templateflow_cohort` | Cohort to use for the template space (not required for most template, but if it is, simply provide the cohort's number). | `integer` |  |  | False |
| `templateflow_home` | Path to the TemplateFlow home directory where templates will be downloaded. If you are running the pipeline without internet access, this needs to point to a folder containing predownloaded templates. | `string` | ./templateflow |  | False |
| `use_template_t2w` | Use the T2w image from the template space (useful with infant data.). | `boolean` | False |  | False |

### **Pipeline profile**

Pipeline profile options. This is a short list of options. For full description, please see [the documentation](https://scilus.github.io/sf-pediatric/guides/usage/#choosing-a-profile)

| Parameter | Description | Type | Default | Required | Hidden |
|-----------|-----------|-----------|-----------|-----------|-----------|
| `tracking` | Perform tracking profile. | `boolean` | False |  | True |
| `bundling` | Perform bundle extraction profile. | `boolean` | False |  | True |
| `connectomics` | Perform connectomics profile. | `boolean` | False |  | True |
| `segmentation` | Perform segmentation profile. | `boolean` | False |  | True |

### **Institutional config options**

Parameters used to describe centralised config profiles. These should not be edited.

| Parameter | Description | Type | Default | Required | Hidden |
|-----------|-----------|-----------|-----------|-----------|-----------|
| `custom_config_version` | Git commit id for Institutional configs. | `string` | master |  | True |
| `custom_config_base` | Base directory for Institutional configs. <details><summary>Help</summary><small>If you're running offline, Nextflow will not be able to fetch the institutional config files from the internet. If you don't need them, then this is not a problem. If you do need them, you should download the files from the repo and tell Nextflow where to find them with this parameter.</small></details>| `string` | https://raw.githubusercontent.com/nf-core/configs/master |  | True |
| `config_profile_name` | Institutional config name. | `string` |  |  | True |
| `config_profile_description` | Institutional config description. | `string` |  |  | True |
| `config_profile_contact` | Institutional config contact information. | `string` |  |  | True |
| `config_profile_url` | Institutional config URL link. | `string` |  |  | True |

### **Generic options**

Less common options for the pipeline, typically set in a config file.

| Parameter | Description | Type | Default | Required | Hidden |
|-----------|-----------|-----------|-----------|-----------|-----------|
| `version` | Display version and exit. | `boolean` |  |  | True |
| `publish_dir_mode` | Method used to save pipeline results to output directory. (accepted: `symlink`|`rellink`|`link`|`copy`|`copyNoFollow`|`move`) <details><summary>Help</summary><small>The Nextflow `publishDir` option specifies which intermediate files should be saved to the output directory. This option tells the pipeline what method should be used to move these files. See [Nextflow docs](https://www.nextflow.io/docs/latest/process.html#publishdir) for details.</small></details>| `string` | copy |  | True |
| `lean_output` | Do not copy intermediate files to output directory. | `boolean` |  |  | False |
| `email_on_fail` | Email address for completion summary, only when pipeline fails. <details><summary>Help</summary><small>An email address to send a summary email to when the pipeline is completed - ONLY sent if the pipeline does not exit successfully.</small></details>| `string` |  |  | True |
| `plaintext_email` | Send plain-text email instead of HTML. | `boolean` |  |  | True |
| `max_multiqc_email_size` | File size limit when attaching MultiQC reports to summary emails. | `string` | 25.MB |  | True |
| `monochrome_logs` | Do not use coloured log outputs. | `boolean` |  |  | True |
| `hook_url` | Incoming hook URL for messaging service <details><summary>Help</summary><small>Incoming hook URL for messaging service. Currently, MS Teams and Slack are supported.</small></details>| `string` |  |  | True |
| `multiqc_config` | Custom config file to supply to MultiQC. | `string` |  |  | True |
| `multiqc_logo` | Custom logo file to supply to MultiQC. File name must also be set in the MultiQC config file | `string` |  |  | True |
| `multiqc_methods_description` | Custom MultiQC yaml file containing HTML including a methods description. | `string` |  |  |  |
| `validate_params` | Boolean whether to validate parameters against the schema at runtime | `boolean` | True |  | True |
| `pipelines_testdata_base_path` | Base URL or local path to location of pipeline test dataset files | `string` | None |  | True |
| `trace_report_suffix` | Suffix to add to the trace report filename. Default is the date and time in the format yyyy-MM-dd\_HH-mm-ss. | `string` |  |  | True |
| `help` | Display the help message. | `['boolean', 'string']` |  |  |  |
| `help_full` | Display the full detailed help message. | `boolean` |  |  |  |
| `show_hidden` | Display hidden parameters in the help message (only works when --help or --help\_full are provided). | `boolean` |  |  |  |
