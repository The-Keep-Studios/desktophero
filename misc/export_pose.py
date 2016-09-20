import bpy

POSE_INDEX = 1
bpy.data.scenes[0].update()
objects = bpy.data.objects
#pose_markers = bpy.data.actions["all_poses"].pose_markers
bones = bpy.data.objects['Armature'].pose.bones
#bpy.ops.poselib.apply_pose(pose_index=POSE_INDEX)
out_file = open("C:/Users/andrew/workspace/desktophero/local/pose.txt", "w")
try:
	out_file.write("{")
	#out_file.write('"pose_name":"' + pose_markers[POSE_INDEX].name + '", ')
	out_file.write('"pose_name":"test", ')
	out_file.write('"bones":[')
	for bone_index in range(len(bones)):
		bone = bones[bone_index]
		out_file.write('{"bone_name":"' + bone.name + '", ')

		out_file.write('"rotation":[')

		euler = bone.rotation_quaternion.to_euler()
		print(bone.rotation_quaternion)
		out_file.write(str(euler.x) + ", ")
		out_file.write(str(euler.y) + ", ")
		out_file.write(str(euler.z))
		out_file.write(']}')

		if bone_index != len(bones)-1:
			out_file.write(', ')
	out_file.write("]}")
finally:
	out_file.close()

'''

'{"pose_name":"name",
"bones":[
	{"bone_name":"name", "rotation_quat":[1, 2, 3, 4]},
	{"bone_name":"name", "rotation_quat":[1, 2, 3, 4]}
]}'



'''